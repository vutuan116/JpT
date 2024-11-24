function start() {
    _listWordbook = [];
    let listLesson = $("input[type=checkbox]:checked");
    $(".btn_ontop")[0].click();
    if (!listLesson || listLesson.length == 0) {
        alert("Hãy chọn ít nhất 1 bài học");
        return;
    }

    let level = $("#level_sel").val();
    let wordType = $("#word_type_sel").val();

    listLesson.each(x => {
        var lesson = listLesson[x].value;

        var tempWb = [];
        if ($("#wb_kan_sel").val() == "wordbook") {
            tempWb = _tuVungJson.filter(y => y.Level == level && y.Lesson == lesson)[0];
        } else if ($("#wb_kan_sel").val() == "kanji") {
            tempWb = _kanjiJson.filter(y => y.Level == level && y.Lesson == lesson)[0];
        } else {
            tempWb = _grammarJson.filter(y => y.Level == level && y.Lesson == lesson)[0];
        }
        _listWordbook = _listWordbook.concat(tempWb.Data);
    });

    _listWordbook.forEach(wb1 => {
        wb1.IsHard = wordHardHistory.includes(wb1.Id.toString());
    });

    // if (wordType == "hard") {
    //     _listWordbook = derangeArray(_listWordbook.filter(wb => wb.IsHard));
    // }
    if (!_listWordbook || _listWordbook.length == 0) {
        alert("Không có từ phù hợp");
        return;
    }

    if ($("#wb_kan_sel").val() == "grammar") {
        genHtmlGrammar();
        goPage("grammar");
    } else {
        genHtmlWord();
        goPage("word");
    }

    saveSetting();

    $(".eye_hira").click();
    $(".eye_mean").click();
}
function genHtmlGrammar() {
    var html = "";
    var index = 0;
    _listWordbook.forEach(gram => {
        index++;

        var htmlMean = gram.Mean.replaceAll("\n", "<br>");

        var htmlGm = "";
        gram.Grammar.split("\n").forEach(x => {
            htmlGm = htmlGm + genHtmlForGrammar(x);
        })

        var htmlExam = genHtmlKanji(gram.Example.replaceAll("\n", "<br>"));

        html +=
            `<div class="grammar">
                <div class="row gram_header">
                    <div class="col-auto pr-0">
                        <h4 class="p-0 m-0"><i class="fas fa-star"></i> <!--${index}--> ${gram.Label}: </h4>
                    </div>
                    <div class="col text-end p-0">
                        <button type="button" class="btn btn-outline-primary btn-sm w-auto" onclick="$('#gm_${gram.Id}').toggleClass('hide')"><i class="far fa-chevron-double-down"></i></button>
                    </div>
                </div>
                <div class="gram_content hide" id="gm_${gram.Id}">
                    <h5 class="ml-2 p-0">Mean:</h5>
                    <p class="ml-3 p-0">${htmlMean}</p>
                    <h5 class="ml-2 p-0">Grammar:</h5>
                    ${htmlGm}
                    <h5 class="ml-2 p-0">Example:</h5>
                    <p class="ml-3 p-0">${htmlExam}</p>
                </div>
            </div>`;
    });
    $(".div_grammar").html(html);
}

function genHtmlForKanji(index, word, isShowRandom) {
    let resultHtml = `<tr>`;
    var isShowKanji = isShowRandom ? getRandomInt(0, 100) % 2 == 0 : true;
    if (!word.Kanji || word.Kanji==""){
        word.Kanji = word.Hira;
    }

    resultHtml +=
        `<td class="td_wHard pr-0 bd_r_0">
            <i id="star_kj_${word.Id}" value="${word.Id}" class="fas fa-star btn_wordhard ${word.IsHard ? "on" : ""}" value="${word.Id}" onclick="this.classList.toggle('on')"></i>
        </td>`;

    resultHtml +=
        `<td class="bd_l_0 bd_r_0" onclick="toggleHideEle(this)">
            <span class="wb td_kanji cursor_pointer ${isShowKanji ? "hi_de" : "hide"}" onclick='copyText(this,"${word.Kanji}")'>${word.Kanji}</span>
        </td>`;

    resultHtml +=
        `<td class="" onclick="toggleHideEle(this)">
            <span class="wb td_hira ${isShowRandom && isShowKanji ? "hide" : "hi_de"}">${word.Hira}</span>
        </td>`;

    resultHtml +=
        `<td class="lineh-1" onclick="toggleHideEle(this)">
            <p class="m-0 td_mean ${isShowRandom && isShowKanji ? "hide" : "hi_de"}">`;
    if (!(!word.CnVi || word.CnVi == undefined || word.CnVi == "")){
        resultHtml +=
            `<label class="cnvi">${word.CnVi}</label> <br>`;
    }
    resultHtml += `<span>${word.Mean}</span>
                </p></td>`;

    return resultHtml;
}

function mixWb() {
    saveWordHard();
    
    _listWordbook = derangeArray(_listWordbook);
    genHtmlWord();

    $(".eye_hira").click();
    $(".eye_mean").click();
    $(".btn_ontop")[0].click();
}

function mixOnlyHardWb() {
    var listHard = $(".btn_wordhard.on");
    if (!listHard || listHard.length == 0) {
        alert("Không có từ phù hợp");
        return;
    }
    saveWordHard();
    var listWbHard = [];
    listHard.each(x => {
        listWbHard.push(_listWordbook.filter(y => y.Id == Number(listHard[x].getAttribute("value")))[0]);
    });

    _listWordbook = derangeArray(listWbHard);
    genHtmlWord();

    $(".eye_hira").click();
    $(".eye_mean").click();
    $(".btn_ontop")[0].click();
}

function saveAndBack() {
    saveLessonHistory();
    saveWordHard();
    goPage();
    viewListLesson();
    viewHistoryLearning();
}

function scrollLesson(page) {
    $(".lesson_div").scrollTop(0);
    var lsIndex = 0;
    if (page == "wordbook") {
        lsIndex = lsWbIndexLast;
    } else if (page == "kanji") {
        lsIndex = lsKjIndexLast;
    } else {
        return;
    }
    $(".lesson_div").scrollTop($("#wb_lesson_" + lsIndex).offset().top - $("#wb_lesson_" + lsIndex).parent().outerHeight() * 7);
}