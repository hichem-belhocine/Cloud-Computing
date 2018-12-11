Here what i have done so far in the second part of our project:

1- i have edit the first version of the project watch/v1 to watch/v2 with the new endpoints.
2- create new micro-service image/v1 where i bring watch image base on their ids.
3- push the images to docker hub, in order to user them later on.
4- configure the services and the deployments of each image.
5- build the ingress controller with the required paths.

------------------------------------------------------------------
how to test the project:

all you have to do is to navigate to this addresses:

1- to test the first version use this url:

http://35.190.19.170/watch/v1/api-docs

2- to test the second version use this url:

http://35.190.19.170/watch/v2/api-docs

3- to test the image version use this url:

http://35.190.19.170/image/v1/api-docs

you will find the swagger file for each of them you can test them simply from here or from Postman using their based url.

postman e.g (http://35.190.19.170/watch/v2/api/watch/sku).

------------------------------------------------------------------

how to publish the project (it is already published but in case someone wants to do him self):

1- you have to configure your endpoints and be sure to compile them and check that there is no problems.
2- push them to docker hub or Google cloud. 
3- you have to configure the service the deployments of each of the endpoints. 
simply use this command 'kubectl create  -f youservice.ymal' to create the services, the same for the deployment file and for the ingressfile.
note: all the services and the deployment are in the source code file under services folder.
4- you have to wait some minutes before the cloud configure the changes.
5- use the public ip that the ingress gives you, use this command to get that(kubectl get ing youringressname).
put this url in the browser as described in the section how to test the project.
6- you will see a swagger file where you can test all of them right away using the proper urls.

note: the access to the database is already configured, but in order to be able to access your database through its public ip, you have to authorize 
your nodes(vm instances) in the cluster. you can find this information in the database connection tab in the google cloud.

