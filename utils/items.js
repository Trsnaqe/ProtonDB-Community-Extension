function shouldSkipAddingLine(item) {
  if (!item) return true;
  const parent = item?.parentNode ? item.parentNode : item;

  if (parent?.tagName && parent.tagName === "P") {
    return true;
  }

  const classNamesToCheckInParent = [
    "gutter_item",
    "vertical-line",
    "btnv6_blue_hoverfade",
    "btn_small_tall",
    "screenshot",
    "home_content_reason",
    "salepreviewwidgets_TitleCtn_1F4bc",
    "blockbg",
    "package_contents",
    "steamdb_prices",
    "glance_details",
    "gameDlcBlocks",
    "itad-pricing",
    "game_area_description",
    "similar_recent_apps_container",
    "gamehover_TextContent_2ghgg",
  ];

  const classNamesToCheck = [
    "btnv6_blue_hoverfade",
    "btn_small_tall",
    "screenshot",
    "gamehover_Midline_FsH84",
    "discovery_queue_overlay"
  ];

  if (
    item.matches(".gutter_item") ||
    item.querySelector(".vertical-line") ||
    classNamesToCheck.some((className) => item.classList.contains(className)) ||
    classNamesToCheckInParent.some((className) =>
      parent.classList.contains(className)
    )
  ) {
    return true;
  }
  if (shouldMakeItemRelative(item)) makeItemRelative(item);
  return false;
}

function shouldMakeItemRelative(item) {
  if (!item) return false;
  const parent = item?.parentNode ? item.parentNode : item;
  if (item.style.position === "relative") return false;

  const classNamesToCheck = ["Focusable"];

  if (
    classNamesToCheck.some((className) => item.classList.contains(className))
  ) {
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
  if (shouldSkipAddingLine(item)) {
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
function getNewItems() {
  return Array.from(
    document.querySelectorAll(
      'a[href^="https://store.steampowered.com/app/"]:not([class*="ReviewScore"]):not(a[class*="ReviewScore"]), a.home_marketing_message.small.app_impression_tracked'
    )
  ).filter((item) => !items.has(item));
}
