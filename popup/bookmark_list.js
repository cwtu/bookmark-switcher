browser.storage.local.get().then(result => {
  if (!result["currentFolder"]) {
    browser.storage.local.set({currentFolder: ".all"});
  }
});
  
document.addEventListener("click", async function(e) {
  if (!e.target.classList.contains("bookmark-folder")) {
    return;
  }

  let currentFolder = (await browser.storage.local.get())["currentFolder"];
  let targetFolder = e.target.getAttribute("name");
  let folderId = await getId(targetFolder);

  console.log("From: " + currentFolder + " To: " + targetFolder);

  
  moveBookmarks("toolbar_____", await getId(currentFolder)).then(
    moveBookmarks(folderId, "toolbar_____")
  );
  
  browser.storage.local.set({currentFolder: targetFolder});
});

