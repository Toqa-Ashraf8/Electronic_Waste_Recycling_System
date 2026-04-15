using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ElectronicWasteAPI.Models
{
    public class ProductsCart
    {
        [Key]
        public int ProductID { get; set; }
        public int? serial { get; set; }
        public string?  ProductName { get; set; }
        public int? ProductPrice { get; set; }
        public int? Stock { get; set; }
        public int? Points { get; set; }
        public string? ProductImagePath { get; set; }
        public string? Description { get; set; }
        [ForeignKey("CategoryID")]
        public int? CategoryID { get; set; }

    }
}
