var menuSetting = {};
var lessonHistory = [];
var wordHardHistory = [];
var wordbookExtendArray = [];
var kanjiExtendArray = [];

function loadSetting() {
    if (menuSetting.Level) {
        $("#level_sel").val(menuSetting.Level);
    }
    if (menuSetting.ViewType) {
        $("#view_type_sel").val(menuSetting.ViewType);
    }
    if (menuSetting.WordType) {
        $("#word_type_sel").val(menuSetting.WordType);
    }
    if (menuSetting.WordKan) {
        $("#wb_kan_sel").val(menuSetting.WordKan);
    } else {
        $("#wb_kan_sel").val("wordbook");
    }

    if ($("#wb_kan_sel").val() == "wordbook") {
        $("#wordbook_lesson_div").removeClass("hide");
        $("#kanji_lesson_div").addClass("hide");
        $("#grammar_lesson_div").addClass("hide");
    } else if ($("#wb_kan_sel").val() == "kanji"){
        $("#wordbook_lesson_div").addClass("hide");
        $("#kanji_lesson_div").removeClass("hide");
        $("#grammar_lesson_div").addClass("hide");
    }else{
        $("#wordbook_lesson_div").addClass("hide");
        $("#kanji_lesson_div").addClass("hide");
        $("#grammar_lesson_div").removeClass("hide");
    }
}

function saveSetting() {
    menuSetting.Level = $("#level_sel").val();
    menuSetting.ViewType = $("#view_type_sel").val();
    menuSetting.WordType = $("#word_type_sel").val();
    menuSetting.WordKan = $("#wb_kan_sel").val();
    writeDataToFireBase("menuSetting", JSON.stringify(menuSetting));
}

function saveLessonHistory() {
    let listLessonSelected = $("input[type=checkbox]:checked");
    let isProcessing = $('#isProcessing').is(":checked");
    listLessonSelected.each(x => {
        let ls = lessonHistory.find(lsItem => lsItem.Name == listLessonSelected[x].value);
        if (ls) {
            lessonHistory.splice(lessonHistory.indexOf(ls),1);
        }
        lessonHistory.push({ "Name": listLessonSelected[x].value, "Time": new Date().getDateTimeStr() +" "+ new Date().hhmmss(), "IsProcessing":isProcessing })
    });
    writeDataToFireBase("lessonHistory", JSON.stringify(lessonHistory));

    $('#isProcessing').prop('checked', false);
}

function saveWordHard() {
    let listWb = $(".btn_wordhard.on");
    _listWordbook.forEach(x => {
        let index = wordHardHistory.indexOf(x.Id.toString());
        if (index >= 0) {
            x.IsHard = false;
            wordHardHistory.splice(index, 1);
        }
    });
    listWb.each(x => {
        let wordId = listWb[x].getAttribute("value");
        wordHardHistory.push(wordId);
        _listWordbook.filter(wb => wb.Id == wordId)[0].IsHard = true;
    });
    writeDataToFireBase("wordHardHistory", JSON.stringify(wordHardHistory));
}

function goPage(page) {
    $(".div_main").addClass("hide");
    page = page ? page : "menu";
    $(".div_" + page).removeClass("hide");
}

function toggleHideEle(_this) {
    var html = _this.innerHTML;
    if (html.includes("td_kanji") && isLockKanji){
        return;
    }
    if (html.includes("td_hira") && isLockHira){
        return;
    }
    if (html.includes("td_mean") && isLockMean){
        return;
    }

    html = html.includes("hide") ?
        html.replace("hide", "hi_de")
        : html.replace("hi_de", "hide");
    $(_this).html(html);
}

function hideEle(valueId, typeId, isHide) {
    var ele = $("#" + valueId)[0];
    if (typeId == "class") {
        ele = $("." + valueId)[0];
    }
    if (!ele) return;

    if (isHide) {
        $(ele).addClass("hide");
        $(ele).removeClass("hi_de");
    } else {
        $(ele).addClass("hi_de");
        $(ele).removeClass("hide");
    }
}

function lessonChange(type) {
    if (type == "wb") {
        var listLesson = $(".wb_lesson[type=checkbox]:checked");
    }
    else {
        var listLesson = $(".kj_lesson[type=checkbox]:checked");
    }
    var listLs = "";
    if (listLesson && listLesson.length != 0) {
        listLesson.each(x => {
            listLs = listLs + (x == 0 ? '' : ', ') + listLesson[x].value;
        });
    }

    $(".ls_selected").html(listLs);
}

function genHtmlForGrammar(str) {
    var result = `<table class="table table-bordered border-primary align-middle w-auto ml-3 text-grammar">`;
    str = str.replaceAll("/", "<br>");
    str = genHtmlUnderline(str);
    str.split("+").forEach(x => {
        result += `<td>` + x + `</td>`;
    });
    result = genHtmlKanji(result);

    result = result+ `</table>`;
    return result;
}

function genHtmlUnderline(text) {
    regex = /-([^-]+)-/;
    var undeline = regex.exec(text);
    while (undeline) {
        text = text.replace(undeline[0], `<span class="txt_line">${undeline[1]}</span>`);
        undeline = regex.exec(text);
    }
    return text;
}

function genHtmlKanji(text) {
    regex = /=([^=]+)=([^=]+)=/;
    var kjReg = regex.exec(text);
    while (kjReg) {
        text = text.replace(kjReg[0], `<ruby>${kjReg[1]}<rt>${kjReg[2]}</rt></ruby>`);
        kjReg = regex.exec(text);
    }
    return text;
}

function genHtmlWord() {
    var html = "";
    var index = 1;
    var isShowRandom = $('#view_type_sel').val() == "show-random";

    _listWordbook.forEach(word => {
        html += genHtmlForKanji(index, word, isShowRandom);
        index++;
    });
    $("#tbl_show_wordbook" + " > tbody").html(html);
}

function turnOnWordHard(){
    $('.btn_wordhard').addClass("on");
    $('.word-hard-btn').removeClass("off");
}

function copyText(_this, text){
    var isEnableCopy = !$(".lock_kanji").attr("class").includes("off");
    if (isEnableCopy){
        navigator.clipboard.writeText(text);
        $(_this).css("color","red");
        setTimeout(()=>{$(_this).css("color","black")},1000);
    }
}
