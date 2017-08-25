
console.log('sdfdsfdsfds')
const baseURL = 'https://hidden-beach-11595.herokuapp.com/'
$(document).ready(function() {
	$.get(`${baseURL}authors`)
  .then(showAllAuthors)
  .done(appendBooksToAuthor)
});

$('#AddBookBtn').click(function(){
  $('#AddBookBtn').attr('href', `addBook.html?id=${3}`)
})
function appendBooksToAuthor(){
  var booksByAuthorTag=document.getElementsByClassName('booksByAuthor')
  for (let i = 0; i < booksByAuthorTag.length; i++) {
    $.get(`${baseURL}authors/book/${booksByAuthorTag[i].id}`)
    .then(function(msg){

      for (let j = 0; j < msg.length; j++) {
        let booksInfo=`  <h5>${msg[j].title} </h5>`
         $(`#${booksByAuthorTag[i].id}`).append(booksInfo)
      }

    })
  }
}

// table.text('firstName')
//   table.text('lastName')
//   table.text('portriat')
//   table.text('bio')

// <div class="col-lg-4 col-sm-6 col-md-4">
// <div class="thumbnail">
//   <img id="portrait" src="${data[i].portriat}" alt="...">
//   <div class="caption">
//     <h3>${data[i].firstName} ${data[i].lastName}</h3>
//     <p class="bookAuthorsTag" id='${data[i].id}'></p>
//     <p class="bio">${data[i].bio}</p>
//     <p><a href="editAuthors.html?id=${data[i].id}" class="btn btn-default authorsBtn" role="button" >EDIT</a> <a href="#" class="btn btn-default AuthorsBtn" role="button">REMOVE</a></p>
//   </div>
// </div>
// </div>`
function showAllAuthors(data) {
	console.log(data);
	for (let i = 0; i < data.length; i++) {
    let authorsInfo = `
    <div class="col-lg-6 col-sm-6 col-md-6">
    <div class="authorCard">
      <img id="portrait" src="${data[i].portriat}" alt="...">
   <div id='${data[i].id}' class="booksByAuthor" >
    <h4>BOOKS HE WROTE </h4>

    </div>
      <div class="caption">
        <h3>${data[i].firstName} ${data[i].lastName}</h3>

        <p  class="bio">${data[i].bio}</p>
        <p   ><a href="editAuthors.html?id=${data[i].id}" class="btn btn-default authorsBtn" role="button" >EDIT</a> <a href="#" class="btn btn-default authorsBtn" role="button">REMOVE</a></p>

      </div>
    </div>

    </div>`
   $('.authorInfo').append(authorsInfo)
	}
};
