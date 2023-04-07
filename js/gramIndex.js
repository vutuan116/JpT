var gramEditor=[];
$(document).ready(function () {
    var temp = $('.ck_editor.gram');
    temp.each(x => {
        ClassicEditor.create(temp[x]).then(editor => {
            gramEditor.push(editor);
        });
    });
});



function createGrammar() {
    console.log(gramEditor[0].getData());
    console.log(gramEditor[0].getData());
    console.log(gramEditor[0].getData());
}
