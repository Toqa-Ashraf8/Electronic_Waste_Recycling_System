using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ElectronicWasteAPI.Models
{
    public class Item
    {
        [Key]
        public int ItemID { get; set; }
        public int? serial { get; set; }
        public int ItemName { get; set; }
        public string? BrandName { get; set; }
        public string? Quality { get; set; }
        public string? Condition { get; set; }
        public int? EstimatedPrice { get; set; }
        [ForeignKey("CategoryID")]
        public int? CategoryID { get; set; }

    }
}
