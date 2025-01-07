// Wait for both DOM and stylesheets to be loaded
function waitForStyles() {
    return new Promise((resolve) => {
        if (document.styleSheets.length > 0) {
            resolve();
            return;
        }

        const observer = new MutationObserver((mutations, obs) => {
            if (document.styleSheets.length > 0) {
                obs.disconnect();
                resolve();
            }
        });
        
        observer.observe(document.head, {
            childList: true,
            subtree: true
        });
    });
}

async function initializeExtension() {
    try {
        console.log('[ProtonDB] Waiting for styles to load...');
        await waitForStyles();
        console.log('[ProtonDB] Styles loaded, proceeding with initialization');

        const appId = getAppId();
        if (!appId) {
            console.error('[ProtonDB] Could not find app ID');
            return;
        }

        // Process the main game section
        const parentDiv = document.querySelector(".user_reviews");
        if (!parentDiv) {
            console.error('[ProtonDB] Could not find .user_reviews element');
            return;
        }

        const appHeaderContent = document.querySelector(".highlight_overflow");
        if (!appHeaderContent) {
            console.error('[ProtonDB] Could not find .highlight_overflow element');
            return;
        }

        console.log('[ProtonDB] Found required DOM elements');
        appHeaderContent.setAttribute("data-ds-appid", appId);

        // Only add icon if not in excluded classes
        if (!hasAnyClass(appHeaderContent, ClassNamesToCheck) && 
            !hasAnyParentClass(appHeaderContent, ClassNamesToCheckInParent)) {
            addIconToItem(appHeaderContent);
        }

        try {
            // Get game data
            const gameData = await new Promise((resolve, reject) => {
                browserAPI.runtime.sendMessage(
                    { contentScriptQuery: "queryGame", appId: appId },
                    (response) => {
                        if (browserAPI.runtime.lastError) {
                            reject(browserAPI.runtime.lastError);
                            return;
                        }
                        resolve(response);
                    }
                );
            });

            if (!gameData) {
                console.error('[ProtonDB] No game data received');
                return;
            }

            // Create and add rank rows
            const rankRowsContainer = document.createElement("div");
            rankRowsContainer.classList.add("protondb_rank_rows");
            rankRowsContainer.appendChild(
                createRankRow("ProtonDB Rank:", gameData.tier, gameData.tier)
            );
            rankRowsContainer.appendChild(
                createRankRow("Trending Rank:", gameData.trendingTier, gameData.trendingTier)
            );
            parentDiv.appendChild(rankRowsContainer);

            // Get platform data
            const platformData = await new Promise((resolve, reject) => {
                browserAPI.runtime.sendMessage(
                    { contentScriptQuery: "queryPlatforms", appId },
                    (response) => {
                        if (browserAPI.runtime.lastError) {
                            reject(browserAPI.runtime.lastError);
                            return;
                        }
                        resolve(response);
                    }
                );
            });

            if (platformData) {
                parentDiv.appendChild(createPlatformRow(platformData.linux));
            }

        } catch (error) {
            console.error('[ProtonDB] Error fetching data:', error.message);
        }

        // Process all game links on the page
        const gameLinks = document.querySelectorAll('a[href^="https://store.steampowered.com/app/"]');
        gameLinks.forEach(item => {
            if (!items.has(item) && 
                !hasAnyClass(item, ClassNamesToCheck) && 
                !hasAnyParentClass(item, ClassNamesToCheckInParent)) {
                addElementsToItems(item);
            }
        });

        // Start the observers from utils/observers.js
        startObservers();

    } catch (error) {
        console.error('[ProtonDB] Initialization error:', error.message);
    }
}

// Initialize when the page is ready
if (document.readyState === 'complete') {
    initializeExtension();
} else {
    window.addEventListener('load', initializeExtension);
}
