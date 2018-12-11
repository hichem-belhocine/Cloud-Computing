Here is a small explanation about what i have done so far:

1- i have wrote in the first plan 1 of the project1 the following:

a- i have created index on status, since it make sense to add index on the status column since it appears a lot on where and group by clauses.

b- i have created index on year,it make sense also to add index on the year column since it is a range column, and user would like to show the most resent watches.

2- concerning the second plan of the project1:

a- i have chosen the JAVASCRIPT programming language in order to interact with our MYSQL database.

b- i have setup our swagger file with simple authentication.

c- setup the proper header for the Expiration.

3- concerning plan 3 we have done the following:

a- install MYSQL on the ec2 amazon machine.

b- install PHPMYADMIN and link it with MYSQL image.

c- configure our project with proper configuration, in order to contact with MYSQL database.

d- setup a docker compose file in order to run all the images, that i have created so far(MYSQL, PHPMYADMIN and our project).


how to run the project:

1- first clone the project from the current repo.

2-navigate to the project1/RestfulServices/src/config, open the swagger.json file and change the host to your host to localhost:5000 if linux is installed locally, if on the ec2 instance then (you machine public api:5000)

2- navigate to the back to project1/RestfulServices

3- run the following command to run the docker compose, so that all the images will be up and running (docker-compose up).

4-open your browser to the following if you have linux installed locally then open URL(localhost:8080/api-docs/), which is the url for the phpmyadmin file where you have to add the database file(project1.sql) which is under the database folder.
if you are running ec2 innstance open(you machine public api:8080/api-docs/) and dont forget to telnet this url if you are using putty (username:root, pass:secret).

5- open your browser to the following if you have linux installed locally then open URL(localhost:5000/api-docs/), which is the url for the swagger file where all the description of the endpoints is there.
if you are running ec2 innstance open(you machine public api:5000/api-docs/) and dont forget to telnet this url if you are using putty.

6- authenticate using the username: cloud, password: computing.

7- try to execute any endpoint of them.
 






