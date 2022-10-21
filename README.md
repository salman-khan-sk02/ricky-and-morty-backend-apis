# ricky-and-morty-backend-apis

Ricky and morty APIs

step 1 :

run npm i command to install all the dependencies

step 2 :

use command npm start to start the server (make sure your mongoDB service is running before executing this command)

step 3:

please use the signup and signin APIs first before attempting any other API as the token is necessary to run the other APIs

http://localhost:3000/users/signup
http://localhost:3000/users/signin

step 4:

use the token genarated after calling the signin API to call the character APIs

use the token in the header as

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YzAzM2E3MWFiNGU0M2RkODhmMmM3OGQ4ODI5ZDkwZSIsImlhdCI6MTY2NjM1ODc2MSwiZXhwIjoxNjY2NDQ1MTYxfQ.H3Ra-DCO9GGKXhXEgT7Xw59WCLvdEH6HJ6C8-XdcI9c
