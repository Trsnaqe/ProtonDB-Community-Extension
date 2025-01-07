function shouldSkipAddingLine(item) {
    if (!item) return true;
    const parent = item?.parentNode ? item.parentNode : item;

    // Skip if parent is a paragraph or item already has a line
    if (parent?.tagName === "P" || item.querySelector(".vertical-line")) {
        return true;
    }

    // Skip if item matches specific conditions
    if (item.matches(".gutter_item") ||
        hasAnyClass(item, shouldSkipAddingLineGlobals.specificClassesToCheck) ||
        hasAnyParentClass(item, shouldSkipAddingLineGlobals.specificClassesToCheckInParent)) {
        return true;
    }

    shouldMakeItemRelative(item);
    return false;
}

function shouldSkipAddingIcon(item) {
    if (!item) return true;
    const parent = item?.parentNode ? item.parentNode : item;

    // Skip if parent is a paragraph or item already has an icon
    if (parent?.tagName === "P" || item.querySelector(".deck-status-icon")) {
        return true;
    }

    // Skip if item matches specific conditions
    if (item.matches(".gutter_item") ||
        hasAnyClass(item, shouldSkipAddingIconGlobals.specificClassesToCheck) ||
        hasAnyParentClass(item, shouldSkipAddingIconGlobals.specificClassesToCheckInParent)) {
        return true;
    }

    shouldMakeItemRelative(item);
    return false;
}

function shouldMakeItemRelative(item) {
    if (!item || item.style.position === "relative") return false;

    if (hasAnyClass(item, RelativeClassCheck)) {
        makeItemRelative(item);
    }
    if (hasAnyParentClass(item, ParentRelativeClassCheck)) {
        makeItemRelative(item.parentNode);
    }
    return false;
}

function makeItemRelative(item) {
    if (item) item.style.position = "relative";
}

async function addLineToItem(item) {
    if (shouldSkipAddingLine(item)) return;

    const appId = parseAppId(item);
    if (!appId) return;

    try {
        const data = await new Promise((resolve, reject) => {
            browserAPI.runtime.sendMessage(
                { contentScriptQuery: "queryGame", appId },
                (response) => {
                    if (browserAPI.runtime.lastError) {
                        reject(browserAPI.runtime.lastError);
                        return;
                    }
                    resolve(response);
                }
            );
        });

        const tier = data?.tier || "unknown";
        const color = getLineColor(tier);
        const line = createLineElement();
        colorLineElement(line, color);
        line.dataset.tier = tier;
        insertLineBeforeItem(line, item);

    } catch (error) {
        console.error('[ProtonDB] Error adding line:', error.message);
    }
}

async function addIconToItem(item, isItemInSearchBox = false) {
    if (shouldSkipAddingIcon(item)) return;

    const appId = parseAppId(item);
    if (!appId) return;

    try {
        const data = await new Promise((resolve, reject) => {
            browserAPI.runtime.sendMessage(
                { contentScriptQuery: "queryDeckStats", appId },
                (response) => {
                    if (browserAPI.runtime.lastError) {
                        reject(browserAPI.runtime.lastError);
                        return;
                    }
                    resolve(response);
                }
            );
        });

        if (!data?.icon) return;

        const icon = createIconElement(data.status, data.icon);
        const url = document.URL;

        if (isItemInSearchBox) {
            insertIconBeforeItem(icon, item);
        } else if (url.includes("https://store.steampowered.com/search/")) {
            insertIconInList(icon, item);
        } else if (isItemInTabList(item)) {
            insertIconInTabList(icon, item);
        } else {
            insertIconBeforeItem(icon, item);
        }

    } catch (error) {
        console.error('[ProtonDB] Error adding icon:', error.message);
    }
}

function isItemInTabList(item) {
    return item.classList.contains("tab_item") || item.classList.contains("tab_item_overlay");
}

function addElementsToItems(item, isItemInSearchBox = false) {
    if (!item) return;
    addLineToItem(item);
    addIconToItem(item, isItemInSearchBox);
    items.add(item);
}

function getNewItems() {
    const selector = 'a[href^="https://store.steampowered.com/app/"]:not([class*="ReviewScore"]):not(a[class*="ReviewScore"]), a.home_marketing_message.small.app_impression_tracked';
    
    return Array.from(document.querySelectorAll(selector))
        .filter(item => 
            !items.has(item) && 
            !hasAnyClass(item, ClassNamesToCheck) && 
            !hasAnyParentClass(item, ClassNamesToCheckInParent)
        );
}
