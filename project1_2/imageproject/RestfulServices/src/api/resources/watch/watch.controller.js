var request = require('request')
var url = "https://s3-eu-west-1.amazonaws.com/cloudcomputing-2018/project1/images/";
exports.getOne = function (req, rep, error) {
    var sku = req.params.sku;
    var compUrl = url + sku + ".png";
    var requestSettings = {
        url: compUrl,
        method: 'GET',
        encoding: null
    };

    request(requestSettings, function (error, response, body) {
        if (!error && rep.statusCode == 200 && body.length > 306) { //if error 306 for empty body
            rep.setHeader('Content-Type', 'image/png');
            rep.setHeader("Cache-control", new Date(Date.now() + 3600000));
            rep.setHeader('Expires', new Date(Date.now() + 3600000));
            rep.setHeader('ETag', new Date(Date.now() + 3600000));
            rep.send(body);
            rep.end();
        }
        else {
            rep.status(404).json("image not found");
        }
        
    });
};








