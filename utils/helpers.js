function setColors() {
  chrome.storage.local.get(
    {
      borkedColor: "#FF0000",
      bronzeColor: "#CD7F32",
      silverColor: "#A6A6A6",
      goldColor: "#CFB53B",
      platinumColor: "#B4C7DC",
      unknownColor: "#3D3D3D",
    },
    (result) => {
      colors.borked = result.borkedColor;
      colors.bronze = result.bronzeColor;
      colors.silver = result.silverColor;
      colors.gold = result.goldColor;
      colors.platinum = result.platinumColor;
      colors.unknown = result.unknownColor;
    }
  );
}

function parseAppId(item) {
  const link = item.getAttribute("href");
  const linkMatch = link ? link.match(/\/app\/(\d+)/) : null;
  const dataAppId = item ? item.getAttribute("data-ds-appid") : null; // Get the value of data-ds-appid attribute
  return linkMatch && linkMatch[1]
    ? linkMatch[1]
    : dataAppId !== null
    ? dataAppId
    : null;
}

function getAppId() {
  var url = document.URL;

  // Extract the number after "/app/"
  var match = url.match(/\/app\/(\d+)/);
  var appId = match ? match[1] : null;
  return appId;
}

function getLineColor(tier) {
  return colors[tier] || colors.unknown;
}

function hasAnyClass(element, classNames) {
  const elementClassName = element.className;

  for (const className of classNames) {
    if (elementClassName.includes(className)) {
      return true;
    }
  }
  return false;
}


function hasAnyParentClass(element, classNames) {
  let parent = element.parentElement;
  for (const className of classNames) {
    if (element.closest(className)) {
    
      return true;
    }
  }
  return false;
}
