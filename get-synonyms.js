var synonyms = require("./library/synonyms.js");



var myApi = new synonyms.SynonymAPI("8178670293393a5f88a3a624a884d9aa");

myApi.getSynonyms("cat", function(obj){
    console.log(obj);
});

