using System.ComponentModel.DataAnnotations;

namespace ElectronicWasteAPI.Models
{
    public class Category
    {
        [Key]
        public int CategoryID { get; set; }
        public string? CategoryName { get; set; }
        public List<Item> items { get; set; }

    }
}
