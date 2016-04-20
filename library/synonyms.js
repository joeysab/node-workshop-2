var request = require("request");

function SynonymAPI(apiKey) {
    this.apiKey = apiKey;
};


SynonymAPI.prototype.getSynonyms = function(word, callback) {
    var apiSyn = "http://words.bighugelabs.com/api/2/" + this.apiKey + "/" + word + "/json";
    request(apiSyn, function(err, result) {
        var objResult = JSON.parse(result.body);
        callback(objResult)

    });
};



module.exports = {
    SynonymAPI: SynonymAPI
};


