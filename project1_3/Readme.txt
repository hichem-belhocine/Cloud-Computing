Here is a short explanation about what we have done so far:

1- we have created an Api Gateway to receive the requests send by the user. this part of configuration is placed in the cloud.
this gateway should connect to the dynamo db and get the results of a specific watch and it looks like this(/watches/v3/get/{sku})

2- in order to do we have first to create our database(project1) and fill it with watches data, which we get from the provided json file.

the code to do that is the file put.js.

3- now we have to write a lambda function that allow us to connect to this database and this code is placed in the file lambda.js.

4- after that we pretty much done and in order to test the results just type this url in your browser and try to change the sku in oder to see the other watches details.

https://x25itvp9ab.execute-api.us-east-2.amazonaws.com/prod/watches/v3/get/CAC1111.BT0705

sometimes the browser gives timeout message something like that(task timed out after 3.00 seconds), because the engine stays on until a timeout occurs. in this case just refresh the page 
and everthing will be ok.


