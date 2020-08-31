using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace TechnovationsBankingApp
{
    public class CustomerAccount
    {
        [Key]
        public string AccountNumber {get;set;}
        // creates a substring starting at the 4th to last position and 
        // going to the end of the number
        // WARNING: if the account number is shorter than 4 characters this will error
        public string MaskedNumber => "x" + AccountNumber.Substring(AccountNumber.Length -4 );
        public string NickName {get;set;}
        // is the customer currently enrolled in the rewards program
        public bool IsEnrolled {get;set;} = false;
        public int RewardsPoints {get;set;} = 0;
        public string AccountType {get;set;}
        public bool IsEligableForRewards => RewardsPoints >= 50 ? true : false;
        public double CurrentBalance {get;set;} = 0;
        // Magic thats all this is go here to learn the way of the wizard
        // https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings
        // converts numbers to a string formatted in a currency or C format where the number follwing it
        // represents decimal places
        public string FormattedBalance => CurrentBalance.ToString("C");
    }
}
