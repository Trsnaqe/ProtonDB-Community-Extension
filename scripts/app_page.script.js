window.onload = function () {
  const appId=getAppId()

  const parentDiv = document.querySelector(".user_reviews");

  const appHeaderContent =  document.querySelector('.highlight_overflow');
  
  appHeaderContent.setAttribute("data-ds-appid", appId);
  
  addIconToItem(appHeaderContent);
  
  chrome.runtime.sendMessage(
    { contentScriptQuery: "queryGame", appId: appId },
    (data) => {
      if (chrome.runtime.lastError) {
        console.log("error happened:");
        console.log(`Error: ${chrome.runtime.lastError.message}`);
        return;
      }
      const rankRowsContainer = document.createElement("div");
      rankRowsContainer.classList.add("protondb_rank_rows");

      rankRowsContainer.appendChild(
        createRankRow("ProtonDB Rank:", data.tier, data.tier)
      );
      rankRowsContainer.appendChild(
        createRankRow("Trending Rank:", data.trendingTier, data.trendingTier)
      );

      parentDiv.appendChild(rankRowsContainer);
    }
  );
};
