chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.contentScriptQuery == "queryGame") {
    console.log("Received request for appId:", request.appId);
    var url = `https://www.protondb.com/api/v1/reports/summaries/${request.appId}.json`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        console.log(`Responding with data for appId: ${request.appId}`);
        sendResponse(response);
      })
      .catch((error) => {
        sendResponse({ error: error.message }); // Send an error response if needed
      });

    return true; // Keep the message channel open
  } else if (request.contentScriptQuery == "queryReview") {
    console.log("Received request for appId:", request.appId);
    var url = `http://protondb.solidet.com/api/reports/${request.appId}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(`Responding with data for appId: ${request.appId}`);
        sendResponse(data);
      })
      .catch((error) => {
        sendResponse({ error: error.message }); // Send an error response if needed
      });

    return true; // Keep the message channel open
  } else if (request.contentScriptQuery == "queryDeckStats") {
    console.log("Received deck request for appId:", request.appId);
    var url = `https://store.steampowered.com/saleaction/ajaxgetdeckappcompatibilityreport?nAppID=${request.appId}`;
    
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        let status = "";
        console.log(`Responding with data for appId: ${request.appId}`);
        if (!data.success) {
          throw new Error(`Error! No game found, success: ${data.success}`);
        }
        let icon;
        const category=data.results.resolved_category;
        switch (category) {
          case 0:
            status = "unknown";
            icon = "deck_unknown";
            break;
          case 1:
            status = "unsupported";
            icon = "deck_unsupported";
            break;
          case 2:
            status = "playable";
            icon = "deck_playable";
            break;
          case 3:
            status = "verified";
            icon = "deck_verified";
            break;
          default:
            return;
        }
        const deckInfo = {
          status: status,
          icon: icon
        };
        sendResponse(deckInfo);
      })
      .catch((error) => {
        sendResponse({ error: error.message }); // Send an error response if needed
      });

    return true; // Keep the message channel open
  }
});
