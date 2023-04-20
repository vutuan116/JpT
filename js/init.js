var _levelJson = [];
var _tuVungJson = [];
var _kanjiJson = [];
var _grammarJson=[];
var _listWordbook = [];

$(document).ready(function () {
    tuVung.forEach(item => {
        _tuVungJson.push(item);
    });
    kanji.forEach(item => {
        _kanjiJson.push(item);
    });
    grammar.forEach(item => {
        _grammarJson.push(item);
    });
    
    viewListLevel();
    loadSetting();
    viewListLesson();
    goPage();

    $("#wb_kan_sel").on('change', () => {
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
    });

    $(".btn_repeat").on('click', () => {
        this.toggleClass("on");
    });
    $(".btn_wordhard").on('click', () => {
        this.toggleClass("on");
    });
});

function viewListLevel() {
    _levelJson = [];
    _tuVungJson.forEach(x => {
        if (!_levelJson.includes(x.Level)) {
            _levelJson.push(x.Level);
        }
    });
    $("#level_sel").empty();
    _levelJson.forEach(x => {
        $("#level_sel").append(
            `<option value=${x}>${x}</option>`
        );
    })
}

function viewListLesson() {
    let indexWb = 0;
    let htmlWb = "";
    let htmlKj = "";
    let htmlGm = "";
    let level = $("#level_sel").val();

    $("#wordbook_lesson_div").empty();
    $("#kanji_lesson_div").empty();
    $("#grammar_lesson_div").empty();
    _tuVungJson.forEach(x => {
        indexWb++;
        if (level == x.Level) {
            let historyLs = lessonHistory.find(lsItem => lsItem.Name == x.Lesson);
            htmlWb = htmlWb +
                `<tr>
                    <td>
                        <input class="cursor_pointer wb_lesson" type="checkbox" value="${x.Lesson}" id="wb_lesson_${indexWb}" onchange="lessonChange('wb')">
                        <label class="cursor_pointer" for="wb_lesson_${indexWb}">&nbsp;${x.Lesson}</label>
                    </td>
                    <td class="text-end">${historyLs ? historyLs.Time : ''}</td>
                </tr>`;
        }
    });

    $("#wordbook_lesson_div").html(htmlWb);

    _kanjiJson.forEach(x => {
        indexWb++;
        if (level == x.Level) {
            let historyLs = lessonHistory.find((lsItem) => { return lsItem.Name == x.Lesson });
            htmlKj = htmlKj +
                `<tr>
                    <td>
                        <input class="cursor_pointer kj_lesson" type="checkbox" value="${x.Lesson}" id="wb_lesson_${indexWb}" onchange="wbLessonChange('kj')">
                        <label class="cursor_pointer" for="wb_lesson_${indexWb}">&nbsp;${x.Lesson}</label>
                    </td>
                    <td class="text-end">${historyLs ? historyLs.Time : ''}</td>
                </tr>`;
        }
    });
    $("#kanji_lesson_div").html(htmlKj);

    _grammarJson.forEach(x => {
        indexWb++;
        if (level == x.Level) {
            let historyLs = lessonHistory.find((lsItem) => { return lsItem.Name == x.Lesson });
            htmlGm = htmlGm +
                `<tr>
                    <td>
                        <input class="cursor_pointer kj_lesson" type="checkbox" value="${x.Lesson}" id="wb_lesson_${indexWb}" onchange="wbLessonChange('kj')">
                        <label class="cursor_pointer" for="wb_lesson_${indexWb}">&nbsp;${x.Lesson}</label>
                    </td>
                    <td class="text-end">${historyLs ? historyLs.Time : ''}</td>
                </tr>`;
        }
    });
    $("#grammar_lesson_div").html(htmlGm);
    $(".ls_selected").html("");
}