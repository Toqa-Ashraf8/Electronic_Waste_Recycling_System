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
        public int? OrderStatus { get; set; }
        public DateTime? CheckDate { get; set; }
        public string? Notes { get; set; }
    }
}
