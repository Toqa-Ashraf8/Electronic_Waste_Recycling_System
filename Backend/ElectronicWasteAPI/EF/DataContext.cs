using ElectronicWasteAPI.Models;
using ElectronicWasteAPI.ViewModels;
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
            public DbSet<OrdersView> vw_Orders { get; set; } 
            public DbSet<CartProductsView> vw_cartproducts { get; set; }
            public DbSet<DispatchesView> vw_RequestsDetails { get; set; }
            public DbSet<RequestsView> vw_SellRequests { get; set; }
             protected override void OnModelCreating(ModelBuilder modelBuilder)
             {
                modelBuilder.Entity<OrdersView>(eb =>
                {
                    eb.HasNoKey();
                    eb.ToView("vw_Orders");
                });
                modelBuilder.Entity<CartProductsView>(eb =>
                {
                    eb.HasNoKey();
                    eb.ToView("vw_cartproducts");
                });
                modelBuilder.Entity<DispatchesView>(eb => {

                    eb.HasNoKey();
                    eb.ToView("vw_RequestsDetails");
                });
                modelBuilder.Entity<RequestsView>(eb => {

                    eb.HasNoKey();
                    eb.ToView("vw_SellRequests");
                });
             }
    }
}
