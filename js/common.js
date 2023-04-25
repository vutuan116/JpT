function derangeArray(listItem) {
    let result = [];
    while (listItem.length > 0) {
        let index = getRandomInt(0, listItem.length - 1);
        result.push(listItem[index]);
        listItem.splice(index, 1);
    }
    return result;
}

Date.prototype.hhmmss = function () {
    var hh = this.getHours();
    var mm = this.getMinutes();
    var ss = this.getSeconds();

    return [hh < 10 ? '0' + hh : hh, mm < 10 ? '0' + mm : mm, ss < 10 ? '0' + ss : ss].join(':');
};

Date.prototype.yyyyMMdd = function () {
    var yy = this.getFullYear();
    var MM = this.getMonth() + 1;
    var dd = this.getDate();

    return [yy < 10 ? '0' + yy : yy, MM < 10 ? '0' + MM : MM, dd < 10 ? '0' + dd : dd].join('-');
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function wbLessonChange(type) {
    if (type == "wordbook") {
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

function goToHome() {
    if (confirm("Back to Home?") == true) {
        goPage();
    }
}

function showAll(elementClassId) {
    var colElement = $("." + elementClassId);
    var isOff = false;
    if (colElement[0].outerHTML.includes("hide")) {
        colElement.each(x => {
            $(colElement[x]).removeClass("hide");
            $(colElement[x]).addClass("hi_de");
        });
    } else {
        isOff = true;
        colElement.each(x => {
            $(colElement[x]).removeClass("hi_de");
            $(colElement[x]).addClass("hide");
        });
    }
    if (isOff) {
        $("." + elementClassId.replace("td_", "eye_")).addClass("off");

    } else {
        $("." + elementClassId.replace("td_", "eye_")).removeClass("off");
    }
}

var isLockKanji = true;
var isLockHira = false;
var isLockMean = false;

function lockShowHide(elementClass) {
    var element = $(".lock_" + elementClass);
    var isOn = element.attr("class").includes("off");
    if (isOn) {
        element.removeClass("off");
        isLockKanji = elementClass == "kanji" ? true : isLockKanji;
        isLockHira = elementClass == "hira" ? true : isLockHira;
        isLockMean = elementClass == "mean" ? true : isLockMean;
    } else {
        element.addClass("off");
        isLockKanji = elementClass == "kanji" ? false : isLockKanji;
        isLockHira = elementClass == "hira" ? false : isLockHira;
        isLockMean = elementClass == "mean" ? false : isLockMean;
    }
}