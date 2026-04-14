using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ElectronicWasteAPI.Models
{
    public class Orders
    {
        [Key]
        public int OrderID { get; set; }
        [ForeignKey("RequestID")]
        public int? RequestID { get; set; }
        [ForeignKey("UserID")]
        public int? UserID { get; set; }
        [ForeignKey("CategoryID")]
        public int? CategoryID { get; set; }
        [ForeignKey("ItemID")]
        public int? ItemID { get; set; }
        [ForeignKey("QualityID")]
        public int? QualityID { get; set; }
        public int? Points { get; set; }
        public int? OrderStatus { get; set; }
        public DateTime? CheckDate { get; set; }
        public string? Notes { get; set; }
    }
}
