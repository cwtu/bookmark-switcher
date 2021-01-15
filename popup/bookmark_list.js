// check for currentFolder variable in local storage
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
  if (currentFolder === targetFolder){
    return;
  }
  let currentId = await getId(currentFolder);
  let targetId = await getId(targetFolder);

  await moveBookmarks("toolbar_____", currentId);
  await moveBookmarks(targetId, "toolbar_____");

  // update currentFolder and reload
  await browser.storage.local.set({currentFolder: targetFolder});
  window.location.reload();
  
});

