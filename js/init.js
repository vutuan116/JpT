var _levelJson = [];
var _tuVungJson = [];
var _kanjiJson = [];
var _grammarJson = [];
var _listWordbook = [];
var user_Id = "tuannv";
var lsWbIndexLast = 0;
var lsKjIndexLast = 0;

function startPage() {
    tuVung.forEach(item => {
        _tuVungJson.push(item);
    });
    kanji.forEach(item => {
        _kanjiJson.push(item);
    });
    grammar.forEach(item => {
        _grammarJson.push(item);
    });

    wordbookExtendArray.forEach(item => {
        _tuVungJson.push(item);
    });
    kanjiExtendArray.forEach(item => {
        _kanjiJson.push(item);
    });

    viewListLevel();
    loadSetting();
    viewListLesson();
    viewHistoryLearning();
    goPage();

    $("#wb_kan_sel").on('change', () => {
        $("input[type=checkbox]:checked").prop('checked', false);
        if ($("#wb_kan_sel").val() == "wordbook") {
            $("#wordbook_lesson_div").removeClass("hide");
            $("#kanji_lesson_div").addClass("hide");
            $("#grammar_lesson_div").addClass("hide");
        } else if ($("#wb_kan_sel").val() == "kanji") {
            $("#wordbook_lesson_div").addClass("hide");
            $("#kanji_lesson_div").removeClass("hide");
            $("#grammar_lesson_div").addClass("hide");
        } else {
            $("#wordbook_lesson_div").addClass("hide");
            $("#kanji_lesson_div").addClass("hide");
            $("#grammar_lesson_div").removeClass("hide");
        }
        $(".ls_selected").empty();

        scrollLesson($("#wb_kan_sel").val());
    });

    $(".btn_repeat").on('click', () => {
        this.toggleClass("on");
    });
    $(".btn_wordhard").on('click', () => {
        this.toggleClass("on");
    });
    $(".div_loading").addClass("hide");
}

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
    let lsWbLastDate = new Date(0);
    let lsKjLastDate = new Date(0);


    $("#wordbook_lesson_div").empty();
    $("#kanji_lesson_div").empty();
    $("#grammar_lesson_div").empty();
    _tuVungJson.filter(y => y.Level == level).forEach(x => {
        indexWb++;

        let historyLs = lessonHistory.find(lsItem => lsItem.Name == x.Lesson);
        let history = historyLs ? getDayBefore(historyLs.Time) : -1;
        let colorHistory = history > 14 ? "cl_red" : history > 10 ? "cl_yellowred" : history > 7 ? "cl_yellow" : history > 4 ? "cl_greenyellow" : "cl_green";

        let countHard = x.Data.filter(z => wordHardHistory.includes(z.Id.toString())).length;
        htmlWb = htmlWb +
            `<tr>
                    <td>
                        <input class="cursor_pointer wb_lesson" type="checkbox" value="${x.Lesson}" id="wb_lesson_${indexWb}" onchange="lessonChange('wb')">
                        <label class="cursor_pointer" for="wb_lesson_${indexWb}">&nbsp;${x.Lesson}</label>
                    </td>
                    <td>${historyLs && historyLs.IsProcessing ? `<i class="ml-3 fad fa-spinner"></i>` : countHard == 0 ? '' : `<i class="fas fa-star color_star"></i> ` + countHard + ` / ` + x.Data.length}</td>
                    <td class="text-end ${colorHistory}">${historyLs ? convertStrDateToMMdd(historyLs.Time) : ''} </td>
                </tr>`;

        if (historyLs && new Date(historyLs.Time) > lsWbLastDate) {
            lsWbLastDate = new Date(historyLs.Time);
            lsWbIndexLast = indexWb;
        }
    });

    $("#wordbook_lesson_div").html(htmlWb);

    _kanjiJson.filter(y => y.Level == level).forEach(x => {
        indexWb++;
        let historyLs = lessonHistory.find((lsItem) => { return lsItem.Name == x.Lesson });
        let history = historyLs ? getDayBefore(historyLs.Time) : -1;
        let colorHistory = history > 14 ? "cl_red" : history > 10 ? "cl_yellowred" : history > 7 ? "cl_yellow" : history > 4 ? "cl_greenyellow" : "cl_green";


        let countHard = x.Data.filter(z => wordHardHistory.includes(z.Id.toString())).length;
        htmlKj = htmlKj +
            `<tr>
                    <td>
                        <input class="cursor_pointer kj_lesson" type="checkbox" value="${x.Lesson}" id="wb_lesson_${indexWb}" onchange="wbLessonChange('kj')">
                        <label class="cursor_pointer" for="wb_lesson_${indexWb}">&nbsp;${x.Lesson}</label>
                    </td>
                    <td>${historyLs && historyLs.IsProcessing ? `<i class="ml-3 fad fa-spinner"></i>` : countHard == 0 ? '' : `<i class="fas fa-star color_star"></i> ` + countHard + ` / ` + x.Data.length}</td>
                    <td class="text-end ${colorHistory}">${historyLs ? convertStrDateToMMdd(historyLs.Time) : ''}</td>
                </tr>`;

        if (historyLs && new Date(historyLs.Time) > lsKjLastDate) {
            lsKjLastDate = new Date(historyLs.Time);
            lsKjIndexLast = indexWb;
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

    scrollLesson($("#wb_kan_sel").val());
}

function viewHistoryLearning() {
    let html = "";
    lessonHistory.slice(lessonHistory.length - 6, lessonHistory.length).forEach(x => {
        html = `<tr>
                    <td>${x.Name}</td>
                    <td>${x.Time}</td>
                </tr>` + html;
    });
    $("#history_learning").html(html);
}