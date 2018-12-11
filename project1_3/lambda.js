exports.handler = function(event,context,callback) {
    
    var AWS = require("aws-sdk");
    
    let awsConfig = {
        "region": "us-east-2"
    };
    AWS.config.update(awsConfig);
    
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    var table = "project1";
    
    var sku = event.sku;
    
    var params = {
        TableName: table,
        Key:{
            "sku": sku      
        }
    };
    
    docClient.get(params, function(err, data) {
        if (err) {
            callback(null,err);
        } else {
            callback(null,data);
            context.succeed("done");
        }
    });

};