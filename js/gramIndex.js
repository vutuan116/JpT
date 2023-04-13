var gramEditor = [];
var grammarIndex = 0;
var chaSpec = "０１２３４５６７８９ー・　（）＆．＋？";
var chaNorm = "0123456789-/ ()&.+?";

$(document).ready(function () {
    genGrammar();
});
function genGrammar() {
    grammarIndex++;
    var html =
        `<div class="row grammar gra_in_1 ${grammarIndex % 2 == 0 ? 'even' : ''}">
            <h4>Grammar ${grammarIndex}: </h4>
            <div class="row mb-3">
                <h5 class=" col-auto gra_label text-end form-label mb-0 pt-1">Label:</h5>
                <input class="col form-control" type="text" id="label_gra_in_${grammarIndex}">
            </div>
            <div class="row mb-3">
                <h5 class="col-auto gra_label text-end form-label mb-0 pt-1">Mean:</h5>
                <textarea class="col form-control" rows="2" id="mean_gra_in_${grammarIndex}"></textarea>
            </div>
            <div class="row mb-3">
                <h5 class="col-auto gra_label text-end form-label mb-0 pt-1">Grammar:</h5>
                <textarea class="col form-control" rows="2" id="gram_gra_in_${grammarIndex}"></textarea>
            </div>
            <div class="row mb-3">
                <h5 class="col-auto gra_label text-end form-label mb-0 pt-1">Example:</h5>
                <textarea class="col form-control" rows="4" id="exam_gra_in_${grammarIndex}"></textarea>
            </div>
        </div>`;

    $("#grammar_div").append(html);
}

function createGrammar() {
    var grammar = {};
    var lesson = $("#lesson").val();
    var level = $("#level").val();

    grammar.Lesson = lesson;
    grammar.Level = level;
    grammar.Data = [];

    var index = 1;
    while ($("#label_gra_in_" + index).length != 0) {
        var dataTemp = {};
        dataTemp.Label = $("#label_gra_in_" + index).val();
        dataTemp.Mean = $("#mean_gra_in_" + index).val();
        dataTemp.Gram = $("#gram_gra_in_" + index).val();
        dataTemp.Example = $("#exam_gra_in_" + index).val();
        if (dataTemp.Label != "") {
            grammar.Data.push(dataTemp);
        }
        index++;
    }
    var txtData = JSON.stringify(grammar);
    for (i = 0; i < chaSpec.length; i++) {
        txtData = txtData.replaceAll(chaSpec[i], chaNorm[i]);
    }
    $("#grammarData").val(txtData);
}

function convertGrammar() {
    if ($("#grammarData").val() == "") {
        return;
    }

    var txtData = $("#grammarData").val();
    for (i = 0; i < chaSpec.length; i++) {
        txtData = txtData.replaceAll(chaNorm[i], chaSpec[i]);
    }

    var jsonData = JSON.parse(txtData);

    $("#lesson").val(jsonData.Lesson);
    $("#level").val(jsonData.Level);

    for (i = 0; i < jsonData.Data.length; i++) {
        if ($("#label_gra_in_" + (i + 1)).length==0){
            genGrammar();
        }

        $("#label_gra_in_" + (i + 1)).val(jsonData.Data[i].Label);
        $("#mean_gra_in_" + (i + 1)).val(jsonData.Data[i].Mean);
        $("#gram_gra_in_" + (i + 1)).val(jsonData.Data[i].Gram);
        $("#exam_gra_in_" + (i + 1)).val(jsonData.Data[i].Example);
    }

}