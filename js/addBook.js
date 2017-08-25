
const baseURL = 'https://hidden-beach-11595.herokuapp.com/'
$(document).ready(function() {
	$.get(`${baseURL}authors`)
  .then(appendAuthors)

});
$('#bookbutton').click(function(){

   var postData=createBodyNewBook()
  $.ajax({
		url: `${baseURL}books/add`,
		type: 'POST',
    contentType: 'application/json',
		data: JSON.stringify(postData),
		success: function() {
      console.log('successs')
		}
	})
})

$('#addAuthorBtn').click(function(){
  var optionId=$( "#authorAddSelect" ).val()
  var optionText=$( "option:selected", "#authorAddSelect" ).text()
    console.log($("#authorAddSelect" ).text())

        $("#authorsRemoveSelect").append($("<option></option>").val(optionId).html(`${optionText} `));
})
$('#removeAuthorBtn').click(function(){
console.log($( "option:selected", "#authorsRemoveSelect" ).text())
  $( "option:selected", "#authorsRemoveSelect" ).remove()

})


function appendAuthors(data){
  console.log(data)
  for (var i = 0; i < data.length; i++) {
      $("#authorAddSelect").append($("<option></option>").val(data[i].id).html(`${data[i].firstName} ${data[i].lastName}`));
  }

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
