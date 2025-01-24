document.querySelector("#oua").value = navigator.userAgent;
chrome.storage.local.get(["userAgent"]).then((result)=> {
   if (!result.userAgent) {
      chrome.storage.local.set({"userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_7_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15"}).then(()=> {
        //console.log("set default user agent");
      });
      document.querySelector("#cua").innerHTML = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_7_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15";
   } else {
      document.querySelector("#cua").innerHTML = result.userAgent;
      document.querySelector("#uas").value = result.userAgent;
   }
});
document.querySelector("#save").addEventListener("click", () => {
  let ua = document.querySelector("#uas").value;
  chrome.runtime.sendMessage({ action: "updateUserAgent", userAgent: ua}).then((response)=> {
  document.querySelector("#cua").innerHTML = ua;
   /*
    if (response.status == "success") {
       document.querySelector("#cua").innerHTML = ua;
    }
   */
  });
});