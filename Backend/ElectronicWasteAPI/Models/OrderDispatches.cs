using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ElectronicWasteAPI.Models
{
    public class OrderDispatches
    {
        [Key]
        public int DispatchID { get; set; }
        [ForeignKey("OrderID")]
        public int? OrderID { get; set; } 
        public string? ShippingAddress { get; set; }
        public string? CourierName { get; set; }
        public string? CourierPhone { get; set; }
        public DateTime? ArrivalTime { get; set; }
        public DateTime? CreatedAt { get; set; }

    }
}
