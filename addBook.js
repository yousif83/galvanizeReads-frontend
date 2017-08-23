
const baseURL = 'http://localhost:3000/'
$(document).ready(function() {
	$.get(`${baseURL}authors`)
  .then(appendAuthors)

});


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
// $("#authorAddSelect").change(function(){
//   console.log($( "#authorAddSelect" ).val())
// })
