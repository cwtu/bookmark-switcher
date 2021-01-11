

document.addEventListener("click", async function(e) {
  if (!e.target.classList.contains("bookmark-folder")) {
    return;
  }

  let targetFolder = e.target.getAttribute("name");
  let folderId = await getId(targetFolder);
  
  await moveBookmarks("toolbar_____", await getId(currentFolder));
  await moveBookmarks(folderId, "toolbar_____");
  currentFolder = targetFolder;
});


// async function moveBookmarks (fromId, toId){
//   browser.bookmarks.getChildren(fromId).then(nodes => {
//     nodes.forEach(e => {
//       browser.bookmarks.move(e["id"], {parentId: toId});
//     });
//   });
// }