
var url_string = document.URL
var url = new URL(url_string);
var bookId = url.searchParams.get("id");
console.log(bookId);
const baseURL = 'https://hidden-beach-11595.herokuapp.com/'
$.get(`${baseURL}books/author/${bookId}`)
.then(function(msg){

    var authorsInfo=[]
    var authorName=''
    var authorId=0
    var authorObj={}
  for (let j = 0; j < msg.length; j++) {
  authorName=msg[j].firstName + ' ' + msg[j].lastName
  authorId=msg[j].author_id
  authorObj={
    author_id:authorId,
    author_name:authorName
  }
    authorsInfo[j]=authorObj
  }
  appendAuthorsBook(authorsInfo)

})

$.get(`${baseURL}authors`)
.then(appendAuthors)
$.get(`${baseURL}books/${bookId}`)
.then(appendBookInfo)

$('#bookbutton').click(function(){

   var postData=createBodyNewBook()
  $.ajax({
		url: `${baseURL}books/edit/${bookId}`,
		type: 'put',
    contentType: 'application/json',
		data: JSON.stringify(postData),
		success: function() {
      console.log('successs')
		}
	})
})

$('#removeAuthorBtn').click(function(){
console.log($( "option:selected", "#authorsRemoveSelect" ).text())
  $( "option:selected", "#authorsRemoveSelect" ).remove()

})
$('#addAuthorBtn').click(function(){
  var optionId=$( "#authorAddSelect" ).val()
  var optionText=$( "option:selected", "#authorAddSelect" ).text()
    console.log($("#authorAddSelect" ).text())

        $("#authorsRemoveSelect").append($("<option></option>").val(optionId).html(`${optionText} `));
})
function appendAuthorsBook(data){
  console.log(data)
  for (var i = 0; i < data.length; i++) {
      $("#authorsRemoveSelect").append($("<option></option>").val(data[i].author_id).html(data[i].author_name));
  }
}
function appendAuthors(data){
  console.log(data)
  for (var i = 0; i < data.length; i++) {
      $("#authorAddSelect").append($("<option></option>").val(data[i].id).html(`${data[i].firstName} ${data[i].lastName}`));
  }
}
function appendBookInfo(data){
  $('#titleInput').val(data[0].title)
  $('#genreInput').val(data[0].genre)
  $('#urlInput').val(data[0].cover)
  $('#descTextarea').val(data[0].description)
}

function createBodyNewBook(){
  var body={
      title:$('#titleInput').val(),
      genre:$('#genreInput').val(),
      description:$('#descTextarea').val(),
      cover:$('#urlInput').val(),
      authors:[ ]
    }
    $("#authorsRemoveSelect > option").each(function() {
      body.authors.push(parseInt(this.value));
      console.log(this.text + ' ' + this.value);
  });
      return (body)
}
