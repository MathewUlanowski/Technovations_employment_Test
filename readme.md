# Technovations Employment Project
## Requirements:
* .NET core 3.1.400 - this probably isnt the only version this works on but its whats installed in my computer at the moment so thats what it got written in
* .NET entitiy framework
```bash
dotnet tool install --global dotnet-ef
```

* Node.js - the react side of the client runs on node this will need to be installed and packages will automatically install when dotnet run is executed because i used the default .NET React template to start node.js can be aquired [here](https://nodejs.org/en/) most likely the LTS version available will do again you can run ```npm i``` if you want but the the later dotnet run command will do this automatically.

## instructions
### startup
1. execute the appropriate commands to create and migrate a sqlite database more info about this can be found [Here](https://docs.microsoft.com/en-us/ef/core/miscellaneous/cli/dotnet) but the commands are listed below.
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```
2. next you should be able to start the server 
  
```bash
# this will launch it in watcher mode if you make changes it will restart automatically
dotnet watch run
```
```bash
# this launches the application normally without watcher mode
dotnet run
```


### API
* ```"localhost:5001/api"``` is the endpoint for the C# api the responses are below
* ```"/api/accounts"``` - this returns a list of all the accounts as JSON objects the datastructure for each item in the list looks like the following
```JSON
{
  "AccountNumber": string,
  "MaskedNumber": string,
  "IsEnrolled": bool,
  "RewardsPoints" int,
  "AccountType" string,
  "IsEligableForRewards" bool,
  "CurrentBalance" double,
  "FormattedBalance" string
}
```
* ```/api/{AccountNumber}/enroll``` this will return a bool if the object succesfully changed the IsEnrolled status of the object if it is already enrolled then it will return false
* ```/api/{AccountNumber}/redeem``` This will redeem the rewards for the account if applicable and return a bool weather or not it succesfully claimed a reward this can only be done if the customer has 50+ points and is enrolled in the rewards program 
* ```/api/create``` generates a new account with random parameters 
* ```/api/BIGREDBUTTON``` this will go through the database and remove every entry essentually dropping the database without removing the table I put this in mostly to demonstrate delete as well but also when you generate a bunch of accounts that arent demonstrating all the possible scenarios you can reset to make things less cluttered

### web application
the endpoint for the website is ```localhost:5001``` displays the accounts and has some logic to only show the buttons or information relevant to the rewards program (Redeem button, Enroll button or a message that the account is lacking enough points to redeem a reward). upon clicking the button it will make a call to the api perform the appropriate action on the account EX: redeem reward button will call ```/api/{account number}/redeem``` which will remove 50 rewards points and add $50 to the account.

### Technologies used
* .NET Core
* .NET Entity Framework
* React
* SQLite