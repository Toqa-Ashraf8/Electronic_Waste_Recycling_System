using System.ComponentModel.DataAnnotations;

namespace ElectronicWasteAPI.Models
{
    public class CartCategory
    {
        [Key]
        public int CategoryID { get; set; }
        public string? CategoryName { get; set; }
        public List<ProductsCart> products { get; set; }
    }
}
