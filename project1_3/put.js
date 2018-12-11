//AWS node sdk
var AWS = require('aws-sdk');
 
//need to update region in config
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIAJUWL75XT5ABZMH5A", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);
const fs = require('fs');

//create a doc client to allow using JSON directly
var docClient = new AWS.DynamoDB.DocumentClient();

var watchArray = JSON.parse(fs.readFileSync('watches.json', 'utf8'));

//utility function to create a single put request
function getWatch(index){
    return {
        TableName: 'project1',
        Item: watchArray[index]
    };
}
 
//recursive function to save one watch at a time
function saveWatches(index){
    if(index == watchArray.length){
        console.log("saved all.");
        return;
    }
 
    var params = getWatch(index);
    //spit out what we are saving for sanity
    console.log(JSON.stringify(params));
    //use the client to execute put request.
    docClient.put(params, function(err, data) {
        if (err) {
            console.log(err);
        }else{
            console.log("saved Watch item "+index);
            index += 1;
            //save the next watch on the list
            //with half a second delay
            setTimeout(function(){
                saveWatches(index);
            }, 500);
        }
    });
}
 
//start saving from index - 0
saveWatches(0);