function shouldSkipAddingLine(item) {
  if (!item) return true;
  const parent = item?.parentNode ? item.parentNode : item;

  if (parent?.tagName && parent.tagName === "P") {
    return true;
  }

  const specificClassesToCheck = [
    ...ClassNamesToCheck,
    ".animated_featured_capsule_Title_3vZJE",
    ".title",
  ];
  const specificClassesToCheckInParent = [...ClassNamesToCheckInParent];

  if (
    item.matches(".gutter_item") ||
    item.querySelector(".vertical-line") ||
    specificClassesToCheck.some((className) =>
      hasAnyClass(item, [className])
    ) ||
    specificClassesToCheckInParent.some((className) =>
      hasAnyParentClass(item, [className])
    )
  ) {
    return true;
  }
  shouldMakeItemRelative(item);

  return false;
}

function shouldSkipAddingIcon(item) {
  if (!item) return true;
  const parent = item?.parentNode ? item.parentNode : item;

  if (parent?.tagName && parent.tagName === "P") {
    return true;
  }

  const specificClassesToCheck = [
    ...ClassNamesToCheck,
    ".animated_featured_capsule_Artwork_3UsQc",
    ".capsule",
  ];
  const specificClassesToCheckInParent = [...ClassNamesToCheckInParent];

  if (
    item.matches(".gutter_item") ||
    item.querySelector(".deck-status-icon") ||
    specificClassesToCheck.some((className) =>
      hasAnyClass(item, [className])
    ) ||
    specificClassesToCheckInParent.some((className) =>
      hasAnyParentClass(item, [className])
    )
  ) {
    return true;
  }
  shouldMakeItemRelative(item);
  return false;
}

function shouldMakeItemRelative(item) {
  if (!item) return false;
  if (item.style.position === "relative") return false;

  if (RelativeClassCheck.some((className) => hasAnyClass(item, [className]))) {
    makeItemRelative(item);
  }
  if (
    ParentRelativeClassCheck.some((className) =>
      hasAnyParentClass(item, [className])
    )
  ) {
    makeItemRelative(item.parentNode);
  }
  return false;
}

function makeItemRelative(item) {
  if (item) item.style.position = "relative";
}

function addLineToItem(item) {
  if (shouldSkipAddingLine(item)) {
    return;
  }

  const appId = parseAppId(item);

  chrome.runtime.sendMessage(
    { contentScriptQuery: "queryGame", appId },
    (data) => {
      if (chrome.runtime.lastError) {
        console.log("Error happened:");
        console.log(`Error: ${chrome.runtime.lastError.message}`);
        return;
      }
      const tier = data?.tier || "unknown";

      const color = getLineColor(tier);
      const line = createLineElement();
      colorLineElement(line, color);

      // Add tier as a data attribute to the line element
      line.dataset.tier = tier;

      insertLineBeforeItem(line, item);
    }
  );
}
function addIconToItem(item, isItemInSearchBox) {
  if (shouldSkipAddingIcon(item)) {
    return;
  }

  const appId = parseAppId(item);

  chrome.runtime.sendMessage(
    { contentScriptQuery: "queryDeckStats", appId },
    (data) => {
      if (chrome.runtime.lastError) {
        console.log("Error happened:");
        console.log(`Error: ${chrome.runtime.lastError.message}`);
        return;
      }

      const status = data.status;
      const imageKey = data.icon;
      if (!imageKey) {
        return;
      }
      const icon = createIconElement(status, imageKey);
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
    }
  );
}

function isItemInTabList(item) {
  return item.classList.contains("tab_item")||item.classList.contains("tab_item_overlay");
}

function addElementsToItems(item, isItemInSearchBox = false) {
  if (!item) return;

  addLineToItem(item);
  addIconToItem(item, isItemInSearchBox);
  items.add(item);
}

function getNewItems(node=document) {
  return Array.from(
    document.querySelectorAll(
      'a[href^="https://store.steampowered.com/app/"]:not([class*="ReviewScore"]):not(a[class*="ReviewScore"]), a.home_marketing_message.small.app_impression_tracked'
    )
  ).filter(
    (item) =>
      !items.has(item) &&
      !hasAnyClass(item, ClassNamesToCheck) &&
      !hasAnyParentClass(item, ClassNamesToCheckInParent)
  );
}
