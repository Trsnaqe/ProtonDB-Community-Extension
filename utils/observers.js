// Retrieve colors from chrome storage and set them in the colors object

function handleContentMutation(mutationsList) {
  mutationsList.forEach((mutation) => {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const newItems = getNewItems();
          if (newItems.length > 0) {
            newItems.forEach((item) => {
              items.add(item);
              addLineToItem(item);
              addIconToItem(item);
            });
          }
        }
      });
    }
  });
}

function handleStorageMutation(changes, namespace) {
  // Identify tiers that have changed color
  const changedTiers = [];
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key.endsWith("Color")) {
      const tier = key.replace("Color", "");
      colors[tier] = newValue;
      changedTiers.push(tier);
    }
  }

  // If any tiers had their colors changed, update the lines and rank value spans
  if (changedTiers.length > 0) {
    const selector = changedTiers
      .map((tier) => `.vertical-line[data-tier="${tier}"]`)
      .join(",");
    const lines = document.querySelectorAll(selector);
    lines.forEach((line) => {
      const tier = line.dataset.tier;
      line.style.backgroundColor = colors[tier];

      // Update the rank value spans with the changed tier
      const lowercaseTier = tier.toLowerCase();
      const rankValueSpans = document.querySelectorAll(
        `.protondb_rank_value[data-tier="${lowercaseTier}"]`
      );
      if (rankValueSpans.length === 0) return;
      rankValueSpans.forEach((rankValueSpan) => {
        if (colors.hasOwnProperty(lowercaseTier)) {
          rankValueSpan.style.color = colors[lowercaseTier];
        }
      });
    });
  }
}

// Observer for search suggestion links
const searchSuggestionsObserver = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.matches(
            "a[href^='https://store.steampowered.com/app/']:not([class*='ReviewScore']):not(a[class*='ReviewScore']), a.home_marketing_message.small.app_impression_tracked"
          )
        ) {
          addLineToItem(node);
          addIconToItem(node);
        }
      });
    }
  });
});

const contentObserver = new MutationObserver(handleContentMutation);

observers.push(searchSuggestionsObserver);
observers.push(contentObserver);

function startObservers() {
  setColors();
  observers.forEach((observer) => {
    observer.observe(document, { childList: true, subtree: true });
  });
}

// Listen to changes in the local storage
chrome.storage.onChanged.addListener(handleStorageMutation);
