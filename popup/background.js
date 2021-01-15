async function getId (folderName) {
  let folderArray = await browser.bookmarks.search({title: folderName});
  if (folderArray.length === 1 ){
    return folderArray[0]["id"];
  } else if (folderArray.length === 0) {
    throw "folder not found";
  } else {
    throw "multiple folders with the same name.";
  }
}

function moveBookmarks (fromId, toId){
  return browser.bookmarks.getChildren(fromId).then(async nodes => {
    let i = 0;

    for (i = 0 ; i < nodes.length ;) {
      await browser.bookmarks.move(nodes[i]["id"], {parentId: toId, index: i++});
    }
  });
}

function showFolders (parentId) {
  return browser.bookmarks.getChildren(parentId).then(nodes => {
    let body = document.getElementsByTagName("BODY")[0];
  
    for(let i = 0; i < nodes.length; i ++){
      if (nodes[i]["type"] === "folder"){
        let folderDiv = document.createElement("DIV");
        let text = document.createTextNode(nodes[i]["title"]);
  
        folderDiv.appendChild(text);
        folderDiv.setAttribute("class", "bookmark-folder");
        folderDiv.setAttribute("name", nodes[i]["title"]);
  
        body.appendChild(folderDiv);
      }
    }
  });
}

let background = browser.bookmarks.search({title: ".all"}).then( async array => {
  // create all folder under Other Bookmarks if all doesn't exist
  if (array.length === 0) {
    return (await browser.bookmarks.create({title: ".all", parentId: "unfiled_____"}))["id"];
  } else{
    return array[0]["id"];
  }  
}).then(async allId => {

  // show all the folders
  await showFolders("toolbar_____");
  await showFolders(allId);

  // create element for all bookmarks
  let body = document.getElementsByTagName("BODY")[0];
  let all = document.createElement("DIV");
  let text = document.createTextNode("All");

  all.appendChild(text);
  all.setAttribute("class", "bookmark-folder");
  all.setAttribute("name", ".all")
  body.appendChild(all);

});






