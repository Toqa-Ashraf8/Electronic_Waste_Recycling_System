using Microsoft.EntityFrameworkCore;

namespace ElectronicWasteAPI.EF
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext>options) : base(options) { }

       







    }
}
