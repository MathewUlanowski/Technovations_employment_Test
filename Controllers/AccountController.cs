using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;

namespace TechnovationsBankingApp.Controllers
{
  public class AccountController : ControllerBase
  {
    // variable of Context type that will be used to handle database querys
    private Context dbContext;
    // establishes connection to the SQLite db
    public AccountController(Context context) {
      dbContext = context;
    }

    private static string[] AccountTypes = new[]
    {
      "checking",
      "savings",
      "Money Market"
    };

    [HttpGet("/api/create")]
    public string CreateSomeAccounts() 
    {
      var rng = new Random();
      CustomerAccount account = new CustomerAccount{
        AccountNumber = "8675309" + rng.Next(0000,9999).ToString("D4"),
        NickName = "pop-culture account",
        AccountType = AccountTypes[rng.Next(AccountTypes.Length)],
        IsEnrolled = rng.Next(100)>=50 ? true : false,
        CurrentBalance = Convert.ToDouble(rng.Next(10000000))/100,
        RewardsPoints = rng.Next(100)
      };

      dbContext.Add(account);
      dbContext.SaveChanges();

      return JsonSerializer.Serialize(account);
    }
    [HttpGet("/api/accounts")]
    public string GetAllAccounts()
    {
      List<CustomerAccount> account= dbContext.Accounts.ToList();
      return JsonSerializer.Serialize(account);
    }

    [HttpGet("/api/{acctnumber}/enroll")]
    public bool EnrollAccount(string acctnumber){
      CustomerAccount account = dbContext.Accounts.Single(a => a.AccountNumber == acctnumber);
      if(!account.IsEnrolled){
        account.IsEnrolled = true;
        dbContext.SaveChanges();
        return true;
      }
      return false;
    }
    [HttpGet("/api/{acctnumber}/redeem")]
    public bool RedeemReward(string acctnumber){
      CustomerAccount account = dbContext.Accounts.Single(a => a.AccountNumber == acctnumber);
      if(account.IsEnrolled && account.RewardsPoints>=50){
        account.RewardsPoints = account.RewardsPoints - 50;
        account.CurrentBalance = account.CurrentBalance + 50;
        dbContext.SaveChanges();
        return true;
      }
      return false;
    }

    [HttpGet("/api/BIGREDBUTTON")]
    public bool BigRedButton()
    {
      List<CustomerAccount> accounts = dbContext.Accounts.ToList();
      foreach(CustomerAccount account in accounts){
        dbContext.Remove(account);
      }
      dbContext.SaveChanges();
      return true;
    }
  }
}
