using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TechnovationsBankingApp
{
  public class Context : DbContext
  {
    public Context(DbContextOptions<Context> options) : base(options) {}
    public DbSet<CustomerAccount> Accounts {get;set;}
  }
}