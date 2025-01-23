var index = 0;
var listID = [];
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
                    <td class="text-center" scope="col">Từ vựng</th>
                    <th class="text-center" scope="col">${wordbookExtendArray[i].Lesson}</th>
                    <th class="text-center" scope="col">
                        <button class="btn btn-outline-danger" onclick="deleteLessonExtend('Từ vựng','${wordbookExtendArray[i].Lesson}')"><i class="fas fa-trash"></i></button>
                    </th>
                </tr>`;
    }
    for (let i = 0; i < kanjiExtendArray.length; i++) {
        html += `<tr>
                    <td class="text-center" scope="col">Kanji</th>
                    <th class="text-center" scope="col">${kanjiExtendArray[i].Lesson}</th>
                    <th class="text-center" scope="col">
                        <button class="btn btn-outline-danger" onclick="deleteLessonExtend('Kanji','${kanjiExtendArray[i].Lesson}')"><i class="fas fa-trash"></i></button>
                    </th>
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

}

function addNewLine(id) {
    if (id && $("#table_new_word").children('tr').last().attr('id') != ("tr_" + id)) {
        return;
    }
    index++;

    id = new Date().getTime();
    listID.push(id);

    let html = `<tr id="tr_${id}">
                    <td>${index}</td>
                    <td><textarea id="wb_${id}" class="form-control form-control-sm" rows="2" onchange="addNewLine(${id})"></textarea></td>
                    <td><textarea id="hira_${id}" class="form-control form-control-sm" rows="2" onchange="addNewLine(${id})"></textarea></td>
                    <td><textarea id="cnvi_${id}" class="form-control form-control-sm" rows="2" onchange="addNewLine(${id})"></textarea></td>
                    <td><textarea id="mean_${id}" class="form-control form-control-sm" rows="2" onchange="addNewLine(${id})"></textarea></td>
                </tr>`;
    $("#table_new_word").append(html);
}

function createLesson() {
    var lesson = {};
    lesson.Lesson = $("#lesson_name").val();
    if (lesson.Lesson == ""){
        alert("Vui lòng nhập tên bài học");
        return;
    }
    lesson.Level = $("#lesson_level").val();
    lesson.Data = [];

    for (let i = 0; i < listID.length-1; i++) {
        lesson.Data.push({
            "Id": listID[i],
            "Kanji": $("#wb_" + listID[i]).val().replace("\n","<br>"),
            "Hira": $("#hira_" + listID[i]).val().replace("\n","<br>"),
            "CnVi": $("#cnvi_" + listID[i]).val().replace("\n","<br>"),
            "Mean": $("#mean_" + listID[i]).val().replace("\n","<br>")
        });
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

function repair(){
    for (let i = 0; i < wordbookExtendArray[0].Data.length; i++) {
        if (wordbookExtendArray[0].Data[i].Kanji == "〜というのは/〜とは"){
            wordbookExtendArray[0].Data[i].Kanji = "〜というのは<br>〜とは";
        }
        if (wordbookExtendArray[0].Data[i].Kanji == "〜というと <br>〜といえば \n〜といったら"){
            wordbookExtendArray[0].Data[i].Kanji = "〜というと <br>〜といえば <br>〜といったら";
        }
        
        wordbookExtendArray[0].Data[i].Kanji = wordbookExtendArray[0].Data[i].Kanji.replace("\n","<br>");
        wordbookExtendArray[0].Data[i].Hira = wordbookExtendArray[0].Data[i].Hira.replace("\n","<br>");
        wordbookExtendArray[0].Data[i].CnVi = wordbookExtendArray[0].Data[i].CnVi.replace("\n","<br>");
        wordbookExtendArray[0].Data[i].Mean = wordbookExtendArray[0].Data[i].Mean.replace("\n","<br>");
    }
    writeDataToFireBase("wordbookExtend", JSON.stringify(wordbookExtendArray));
}