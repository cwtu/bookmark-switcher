let currentFolder = ".all";

async function getId (folderName) {
  let folderArray = await browser.bookmarks.search(folderName);
  
  if (folderArray.length === 1 ){
    return folderArray[0]["id"];
  } else if (folderArray.length === 0) {
    throw "folder not found";
  } else {
    throw "multiple folders with the same name.";
  }
}

async function moveBookmarks (fromId, toId){
  browser.bookmarks.getChildren(fromId).then(nodes => {
    nodes.forEach(e => {
      browser.bookmarks.move(e["id"], {parentId: toId});
    });
  });
}

let background = browser.bookmarks.search(".all").then( async array => {
  // create all folder under Other Bookmarks if all doesn't exist
  if (array.length === 0) {
    return (await browser.bookmarks.create({title: ".all", parentId: "unfiled_____"}))["id"];
  } else{
    return array[0]["id"];
  }  
}).then(allId => {
  // move bookmarks from toolbar to Other Bookmarks
  // moveBookmarks("toolbar_____", allId);

  // show all the folders
  browser.bookmarks.getChildren(allId).then(nodes => {
    let body = document.getElementsByTagName("BODY")[0];
    let folderList = [];
  
    nodes.forEach(e => {
      if (e["type"] === "folder"){
        let folderDiv = document.createElement("DIV");
        let text = document.createTextNode(e["title"]);
  
        folderDiv.appendChild(text);
        folderDiv.setAttribute("class", "bookmark-folder");
        folderDiv.setAttribute("name", e["title"]);
  
        body.appendChild(folderDiv);
      }
    });
  
    let all = document.createElement("DIV");
    let text = document.createTextNode("All");
  
    all.appendChild(text);
    all.setAttribute("class", "bookmark-folder");
    all.setAttribute("name", ".all")
    body.appendChild(all);
  });
});









