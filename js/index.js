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
        var lesson = listLesson[x];
        var tempWb = [];
        if ($("#wb_kan_sel").val() == "wordbook") {
            tempWb = _tuVungJson.filter(y => y.Level == level && y.Lesson == lesson.value)[0];
        } else if ($("#wb_kan_sel").val() == "kanji") {
            tempWb = _kanjiJson.filter(y => y.Level == level && y.Lesson == lesson.value)[0];
        } else {
            tempWb = _grammarJson.filter(y => y.Level == level && y.Lesson == lesson.value)[0];
        }
        _listWordbook = _listWordbook.concat(tempWb.Data);
    });

    _listWordbook.forEach(wb1 => {
        wb1.IsHard = wordHardHistory.includes(wb1.Id.toString());
    });

    if (wordType == "hard") {
        _listWordbook = _listWordbook.filter(wb => wb.IsHard);
    }
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
}
function genHtmlGrammar() {
    var html = "";
    var index = 0;
    _listWordbook.forEach(gram => {
        index++;

        var htmlMean = gram.Mean.replaceAll("\n", "<br>");
        var htmlGm = genHtmlForGrammar(gram.Grammar);

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
                    <table class="table table-bordered border-primary align-middle w-auto ml-3 text-grammar">
                        ${htmlGm}
                    </table>
                    <h5 class="ml-2 p-0">Example:</h5>
                    <p class="ml-3 p-0">${htmlExam}</p>
                </div>
            </div>`;
    });
    $(".div_grammar").html(html);
}

function genHtmlForWordBook(index, word, isShowRandom) {
    let resultHtml = `<tr>`;
    var isShowHira = isShowRandom ? getRandomInt(0, 100) % 2 == 0 : true;
    resultHtml +=
        `<td class="td_wHard pr-0 bd_r_0">
            <!--<label class="lb_no" onclick="$('#star_wb_${word.Id}').click()">${index}</label>-->
            <i id="star_wb_${word.Id}" value="${word.Id}" class="fas fa-star btn_wordhard ${word.IsHard ? "on" : ""}" value="${word.Id}" onclick="this.classList.toggle('on')"></i>
        </td>`;

    resultHtml +=
        `<td class="bd_l_0" onclick="toggleHideEle(this)">
            <ruby class="wb td_wordbook ${isShowHira ? "hi_de" : "hide"}">${word.Hira}
                <rt>${word.Kanji}</rt>
            </ruby>
        </td>`;

    resultHtml +=
        `<td class="lineh-1" onclick="toggleHideEle(this)">
            <span class="td_mean ${isShowRandom && isShowHira ? "hide" : "hi_de"}">${word.Mean}</span>
        </td>`;

    return resultHtml;
}

function genHtmlForKanji(index, word, isShowRandom) {
    let resultHtml = `<tr>`;
    var isShowKanji = isShowRandom ? getRandomInt(0, 100) % 2 == 0 : true;

    resultHtml +=
        `<td class="td_wHard pr-0 bd_r_0">
            <!--<label class="lb_no" onclick="$('#star_kj_${word.Id}').click()">${index}</label>-->
            <i id="star_kj_${word.Id}" value="${word.Id}" class="fas fa-star btn_wordhard ${word.IsHard ? "on" : ""}" value="${word.Id}" onclick="this.classList.toggle('on')"></i>
        </td>`;

    resultHtml +=
        `<td class="bd_l_0" onclick="toggleHideEle(this)">
            <span class="wb td_kanji ${isShowKanji ? "hi_de" : "hide"}">${word.Kanji}
            </span>
        </td>`;

    resultHtml +=
        `<td class="" onclick="toggleHideEle(this)">
            <span class="wb td_hira ${isShowRandom && isShowKanji ? "hide" : "hi_de"}">${word.Hira}
            </span>
        </td>`;
    resultHtml +=
        `<td class="lineh-1" onclick="toggleHideEle(this)">
            <p class="m-0 td_mean ${isShowRandom && isShowKanji ? "hide" : "hi_de"}">
            <label class="cnvi">${word.CnVi}</label>
            <br>
            <span>${word.Mean}</span>
            </p>
        </td>`;

    return resultHtml;
}

function mixWb() {
    saveWordHard();
    _listWordbook = derangeArray(_listWordbook);

    genHtmlWord();

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
    $(".btn_ontop")[0].click();
}

function saveAndBack() {
    saveLessonHistory();
    saveWordHard();
    goPage();
    viewListLesson();
}