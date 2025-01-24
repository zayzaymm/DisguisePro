let defaultUserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_7_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15";
function updateUserAgent(userAgent=defaultUserAgent) {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1],
        addRules: [
            {
                id: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                          header: "User-Agent",
                          operation: "set",
                          value: userAgent
                        }
                   ]
                },
                condition: {
                    urlFilter: "*",
                    resourceTypes: ["main_frame"]
                }
            }
        ]
    });
}
chrome.runtime.onMessage.addListener((message,sender,sendResponse) => {
   if (message.action == "updateUserAgent") {
      chrome.storage.local.set({"userAgent": message.userAgent}).then(()=> {
         updateUserAgent(message.userAgent);
         sendResponse({status: "success"});
      });
   }
});