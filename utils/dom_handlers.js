function createRankRow(rankTitle, rankValue, textColor) {
  const rankRow = document.createElement("div");
  rankRow.classList.add("user_reviews_summary_row");

  const createDivWithClasses = (...classes) => {
    const div = document.createElement("div");
    div.classList.add(...classes);
    return div;
  };

  const subtitleDiv = createDivWithClasses("subtitle", "column");
  subtitleDiv.textContent = rankTitle;

  const summaryDiv = createDivWithClasses("summary", "column", "protondb_rank");

  const rankValueSpan = document.createElement("span");
  rankValueSpan.classList.add("protondb_rank_value");
  rankValueSpan.textContent = rankValue;
  rankValueSpan.style.color = colors[textColor] || colors.unknown;
  rankValueSpan.setAttribute("data-tier", rankValue);

  const link = document.createElement("a");
  link.href = `https://protondb.com/app/${getAppId()}`;
  link.textContent = "(?)";

  const rankTitleSpan = document.createElement("span");
  rankTitleSpan.classList.add("responsive_reviewdesc_short");
  rankTitleSpan.textContent = rankTitle.toUpperCase();

  summaryDiv.append(rankValueSpan, link, rankTitleSpan);

  rankRow.append(subtitleDiv, summaryDiv);

  return rankRow;
}

function createIconElement(status, iconUrl) {
  const icon = document.createElement("img");
  var imgURL = chrome.runtime.getURL(`assets/${iconUrl}.png`);

  icon.src = imgURL;
  icon.classList.add("deck-status-icon");
  icon.setAttribute("data-ds-deck-tier", status);
  return icon;
}

function createLineElement() {
  const line = document.createElement("div");
  line.classList.add("vertical-line");
  return line;
}

function insertLineBeforeItem(line, item) {
  if (item.parentNode) item.parentNode.insertBefore(line, item);
  item.prepend(line);
}

function insertIconBeforeItem(icon, item) {
  if (item.parentNode) item.parentNode.insertBefore(icon, item);
  item.prepend(icon);
}

function insertIconInList(icon, item) {
  if (!item) return;
  const gameListing = item.querySelector(".responsive_search_name_combined");
  const reviewBox = gameListing.querySelector(
    ".col.search_reviewscore.responsive_secondrow"
  );
  makeItemRelative(reviewBox);
  const review = reviewBox.querySelector(".search_review_summary");
  icon.classList.add("on-list");
  if (review) review.prepend(icon);
}

function colorLineElement(line, color) {
  line.style.backgroundColor = color;
}

function insertIconInTabList(icon, item) {
  if (item.classList.contains("tab_item_overlay")) {
    item = item.parentNode;
  }
  const details = item.querySelector(".tab_item_details");
  if (!details) return false;

  icon.classList.add("on-tab-list");

  const platformImgs = details.querySelectorAll(".platform_img");

  if (platformImgs.length > 0) {
    const latestPlatformImg = platformImgs[platformImgs.length - 1];
    latestPlatformImg.insertAdjacentElement("afterend", icon);
  }
}
