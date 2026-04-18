using ElectronicWasteAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ElectronicWasteAPI.EF
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext>options) : base(options) { }

            public DbSet<User>Users { get; set; }
            public DbSet<Category> Categories { get; set; }
            public DbSet<Item> Items { get; set; }
            public DbSet<SellRequest> SellRequests { get; set; }
            public DbSet<Qualities> Qualities { get; set; }
            public DbSet<Orders> Orders { get; set; }
            public DbSet<OrderDispatches> OrderDispatches { get; set; }
            public DbSet<CartCategory> CartCategories { get; set; }
            public DbSet<ProductsCart> Products { get; set; }
            public DbSet<Branch> Branches { get; set; }
            public DbSet<Contact> Contacts { get; set; }
    }
}
