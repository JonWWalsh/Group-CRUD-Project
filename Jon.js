//Updates function and GitHub host.  All-HTML layout

const list = document.getElementById("list");
const edit_button = document.getElementById("edit-button");
const end_button = document.getElementById("end-editing");

edit_button.addEventListener("click", function() {
  list.contentEditable = true;
} );

end_button.addEventListener("click", function() {
  list.contentEditable = false;
} )
//This code should be completely modular and can just be placed after the return:btn from the todo app JS