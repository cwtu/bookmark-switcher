document.addEventListener("click", function(e) {
  if (!e.target.classList.contains("bookmark-folder")) {
    return;
  }


  // change bookmark
  alert("click!");

  // var chosenPage = "https://" + e.target.textContent;
  // browser.tabs.create({
  //   url: chosenPage
  // });

});