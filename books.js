const baseURL = 'http://localhost:3000/'
$(document).ready(function() {
	$.get(`${baseURL}books`)
  .then(showAllBooks)
  .done(appendAuthorsToBook)
});





function appendAuthorsToBook(){
  var bookAuthorsPTag=document.getElementsByClassName('bookAuthorsTag')
  for (let i = 0; i < bookAuthorsPTag.length; i++) {
    $.get(`${baseURL}books/author/${bookAuthorsPTag[i].id}`)
    .then(function(msg){
        var authorsInfo=`by  `
      for (let j = 0; j < msg.length; j++) {
      authorsInfo=authorsInfo + msg[j].firstName + ' ' + msg[j].lastName + ' & '
      }
     bookAuthorsPTag[i].innerHTML=authorsInfo.substring(0, authorsInfo.length-2);
    })
  }
}

function showAllBooks(data) {
	for (let i = 0; i < data.length; i++) {
    let booksInfo = `
    <div class="col-lg-4 col-sm-6 col-md-4">
    <div class="thumbnail">
      <img id="cover" src="${data[i].cover}" alt="...">
      <div class="caption">
        <h3>${data[i].title}</h3>
        <p class="bookAuthorsTag" id='${data[i].id}'></p>
        <p class="desc">${data[i].description}</p>
        <p><a href="#" class="btn btn-default bookBtn" role="button" >EDIT</a> <a href="#" class="btn btn-default bookBtn" role="button">REMOVE</a></p>
      </div>
    </div>
    </div>`
   $('.bookInfo').append(booksInfo)
	}
};
