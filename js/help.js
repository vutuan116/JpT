var menuSetting = {};
var lessonHistory = [];
var wordHardHistory = [];

function loadSetting() {
    menuSetting = JSON.parse(localStorage.getItem("menuSetting") ?? "{}");
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

    lessonHistory = JSON.parse(localStorage.getItem("lessonHistory") ?? "[]");
    wordHardHistory = JSON.parse(localStorage.getItem("wordHardHistory") ?? "[]");

    if ($("#wb_kan_sel").val() == "wordbook") {
        $("#wordbook_lesson_div").removeClass("hide");
        $("#kanji_lesson_div").addClass("hide");
    } else {
        $("#wordbook_lesson_div").addClass("hide");
        $("#kanji_lesson_div").removeClass("hide");
    }
}

function saveSetting() {
    menuSetting.Level = $("#level_sel").val();
    menuSetting.ViewType = $("#view_type_sel").val();
    menuSetting.WordType = $("#word_type_sel").val();
    menuSetting.WordKan = $("#wb_kan_sel").val();

    localStorage.setItem("menuSetting", JSON.stringify(menuSetting));
}

function saveLessonHistory() {
    let listLessonSelected = $("input[type=checkbox]:checked");
    listLessonSelected.each(x => {
        let ls = lessonHistory.find(lsItem => lsItem.Name == listLessonSelected[x].value);
        if (ls) {
            ls.Time = new Date().yyyyMMdd();
        } else {
            lessonHistory.push({ "Name": listLessonSelected[x].value, "Time": new Date().yyyyMMdd() })
        }
    });

    localStorage.setItem("lessonHistory", JSON.stringify(lessonHistory));
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
    localStorage.setItem("wordHardHistory", JSON.stringify(wordHardHistory));
}

function goHome() {
    $(".div_main").addClass("hide");
    $(".menu").removeClass("hide");
}

function toggleHideEle(_this) {
    var html = _this.innerHTML;
    html = html.includes("hide") ?
        html.replace("hide", "hi_de")
        : html.replace("hi_de", "hide");
    $(_this).html(html);
}

function hideEle(valueId,typeId,isHide){
    var ele = $("#"+valueId)[0];
    if (typeId=="class"){
        ele = $("."+valueId)[0];
    }
    if (!ele) return;
    
    if (isHide){
        $(ele).addClass("hide");
        $(ele).removeClass("hi_de");
    }else{
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