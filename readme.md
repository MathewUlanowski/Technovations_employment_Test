# Technovations Employment Project
## Requirements:
* .NET core 3.1.400 - this probably isnt the only version this works on but its whats installed in my computer at the moment so thats what it got written in
* .NET entitiy 
```bash
dotnet tool install --global dotnet-ef
```

* Node.js - the react side of the client runs on node this will need to be installed and packages will automatically install when dotnet run is executed because i used the default .NET React template to start

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
1. ```"/api"``` is the endpoint for the C# api the responses are below
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

### web application
the endpoint for the website is ```localhost:5001``` albeit this doesnt do anything right now it will display the accounts and has some logic to only show the buttons or information relevant to the rewards program (Redeem button, Enroll button or a message that the account is lacking enough points to redeem a reward).

### Technologies used
* .NET Core
* .NET Entity Framework
* React