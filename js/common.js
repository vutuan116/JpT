
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

function goToHome(){
    if (confirm("Back to Home?") == true) {
        goPage();
      }
}