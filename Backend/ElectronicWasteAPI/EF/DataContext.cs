using ElectronicWasteAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ElectronicWasteAPI.EF
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext>options) : base(options) { }

             public DbSet<Login>Login { get; set; }
             public DbSet<Register>Register { get; set; }

    }
}
