function shouldSkipAddingLine(item) {
  if (!item) return true;
  const parent = item?.parentNode ? item.parentNode : item;

  if (parent?.tagName && parent.tagName === "P") {
    return true;
  }

  const specificClassesToCheck = [
    ...ClassNamesToCheck,
    "animated_featured_capsule_Title_3vZJE",
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
  if (shouldMakeItemRelative(item)) makeItemRelative(item);
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
    "animated_featured_capsule_Artwork_3UsQc",
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
  if (shouldMakeItemRelative(item)) makeItemRelative(item);
  return false;
}

function shouldMakeItemRelative(item) {
  if (!item) return false;
  if (item.style.position === "relative") return false;

  if (RelativeClassCheck.some((className) => hasAnyClass(item, [className]))) {
    return true;
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
function addIconToItem(item) {
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
      if (url.includes("https://store.steampowered.com/search/")) {
        insertIconInList(icon, item);
      } else insertIconBeforeItem(icon, item);
    }
  );
}

function addElementsToItems(item) {
  if (!item) return;
  addLineToItem(item);
  addIconToItem(item);
}

function getNewItems() {
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
