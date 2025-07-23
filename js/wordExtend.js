var index = 0;
var listID = [];
var lessonNameOld = undefined;
var lessonTypeOld = undefined;
$(document).ready(function () {
    addNewLine();
    
});

Promise.all([getWordbookExtend,getKanjiExtend]).then(() => {
    genListLessonExtend();
});

function genListLessonExtend() {
    let html = "";
    for (let i = 0; i < wordbookExtendArray.length; i++) {
        html += `<tr>
                    <td class="text-center" scope="col">${wordbookExtendArray[i].Level}</th>
                    <td class="text-center" scope="col">Từ vựng</th>
                    <td class="text-start" scope="col">${wordbookExtendArray[i].Lesson}</th>
                    <td class="text-center" scope="col">
                        <button class="btn btn-outline-danger" onclick="editLessonExtend('Từ vựng','${wordbookExtendArray[i].Lesson}')"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-outline-danger" onclick="deleteLessonExtend('Từ vựng','${wordbookExtendArray[i].Lesson}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`;
    }
    for (let i = 0; i < kanjiExtendArray.length; i++) {
        html += `<tr>
                    <td class="text-center" scope="col">${kanjiExtendArray[i].Level}</th>
                    <td class="text-center" scope="col">Kanji</th>
                    <td class="text-start" scope="col">${kanjiExtendArray[i].Lesson}</th>
                    <td class="text-center" scope="col">
                    <button class="btn btn-outline-danger" onclick="editLessonExtend('Kanji','${kanjiExtendArray[i].Lesson}')"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-outline-danger" onclick="deleteLessonExtend('Kanji','${kanjiExtendArray[i].Lesson}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`;
    }
    $("#table_list_lesson").html(html);
}

function deleteLessonExtend(lessonType, lessonName) {
    if (!confirm("Xác nhận xoá bài học ["+lessonName+"] ?")){
        return;
    }
    if (lessonType == "Từ vựng") {
        let index = wordbookExtendArray.indexOf(wordbookExtendArray.find(x => x.Lesson == lessonName));
        if (index > -1) {
            wordbookExtendArray.splice(index, 1);
            writeDataToFireBase("wordbookExtend", JSON.stringify(wordbookExtendArray));
        }
    }else{
        let index = kanjiExtendArray.indexOf(kanjiExtendArray.find(x => x.Lesson == lessonName));
        if (index > -1) {
            kanjiExtendArray.splice(index, 1);
            writeDataToFireBase("kanjiExtend", JSON.stringify(kanjiExtendArray));
        }
    }
    genListLessonExtend();
}

function editLessonExtend(lessonType, lessonName) {
    var lessonE={};
    lessonTypeOld = lessonType;
    lessonNameOld = lessonName;
    if (lessonType == "Kanji"){
        lessonE = kanjiExtendArray.find(x=>x.Lesson == lessonName);
        $("#lesson_type").val("Kanji");
    }else{
        lessonE = wordbookExtendArray.find(x=>x.Lesson == lessonName);
        $("#lesson_type").val("Từ vựng");
    }

    $("#lesson_level").val(lessonE.Level);
    $("#lesson_name").val(lessonE.Lesson);
    $($("#table_new_word tr")[0]).remove();

    index = 0;
    listID = [];
    for(let i=0; i<lessonE.Data.length; i++){
        addNewLine(lessonE.Data[i].Id);
        $("#wb_"+lessonE.Data[i].Id).val(lessonE.Data[i].Kanji);
        $("#hira_"+lessonE.Data[i].Id).val(lessonE.Data[i].Hira);
        $("#cnvi_"+lessonE.Data[i].Id).val(lessonE.Data[i].CnVi);
        $("#mean_"+lessonE.Data[i].Id).val(lessonE.Data[i].Mean);
    }
    addNewLine();
}

function addNewLine(id) {
    if (id && listID.indexOf(id) == -1){
        id = id;
    }else if (id && $("#table_new_word").children('tr').last().attr('id') != ("tr_" + id)) {
        return;
    }else{
        id = new Date().getTime();
    }

    index++;
    listID.push(id);

    let html = `<tr id="tr_${id}">
                    <td>${index}</td>
                    <td><textarea id="wb_${id}" class="form-control form-control-sm" rows="3" onchange="addNewLine(${id})"></textarea></td>
                    <td><textarea id="hira_${id}" class="form-control form-control-sm" rows="3" onchange="addNewLine(${id})"></textarea></td>
                    <td><textarea id="cnvi_${id}" class="form-control form-control-sm" rows="3" onchange="addNewLine(${id})"></textarea></td>
                    <td><textarea id="mean_${id}" class="form-control form-control-sm" rows="3" onchange="addNewLine(${id})"></textarea></td>
                </tr>`;
    $("#table_new_word").append(html);
}

function createLesson() {
    startId = new Date().getTime();
    if (lessonNameOld){
        if (lessonTypeOld == "Từ vựng") {
            let index = wordbookExtendArray.indexOf(wordbookExtendArray.find(x => x.Lesson == lessonNameOld));
            if (index > -1) {
                wordbookExtendArray.splice(index, 1);
            }
        }else{
            let index = kanjiExtendArray.indexOf(kanjiExtendArray.find(x => x.Lesson == lessonNameOld));
            if (index > -1) {
                kanjiExtendArray.splice(index, 1);
            }
        }
    }

    var lesson = {};
    lesson.Lesson = $("#lesson_name").val();
    if (lesson.Lesson == ""){
        alert("Vui lòng nhập tên bài học");
        return;
    }
    lesson.Level = $("#lesson_level").val();
    lesson.Data = [];

    for (let i = 0; i < listID.length-1; i++) {
        let newWb = {
            "Id": listID[i],
            "Kanji": $("#wb_" + listID[i]).val().replace("\n","<br>"),
            "Hira": $("#hira_" + listID[i]).val().replace("\n","<br>"),
            "CnVi": $("#cnvi_" + listID[i]).val().replace("\n","<br>"),
            "Mean": $("#mean_" + listID[i]).val().replace("\n","<br>")
        };
        if (newWb.Kanji != "" || newWb.Hira != "" || newWb.CnVi != "" || newWb.Mean != ""){
            lesson.Data.push(newWb);
        }
    }

    if ($("#lesson_type").val() == "Từ vựng") {
        wordbookExtendArray.push(lesson);
        writeDataToFireBase("wordbookExtend", JSON.stringify(wordbookExtendArray));
    } else {
        kanjiExtendArray.push(lesson);
        writeDataToFireBase("kanjiExtend", JSON.stringify(kanjiExtendArray));
    }
    window.location.reload();
}
