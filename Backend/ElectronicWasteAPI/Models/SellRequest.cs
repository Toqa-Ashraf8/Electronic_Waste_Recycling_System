using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ElectronicWasteAPI.Models
{
    public class SellRequest
    {
        [Key]
        public int RequestID { get; set; }
        [ForeignKey("CategoryID")]
        public int? CategoryID { get; set; }
        public string? DeviceCategory { get; set; }
        public string? DeviceBrand { get; set; }
        [ForeignKey("ItemID")]
        public int? ItemID { get; set; }
        public string? DeviceItem { get; set; }
        [ForeignKey("QualityID")]
        public int? QualityID { get; set; }
        public string? DeviceQuality { get; set; }
        public string? DeviceCondition { get; set; }
        public int? EstimatedPrice { get; set; }
        public string? DeviceImagePath { get; set; }
        public int? PickUpMethod { get; set; }
        public string? ShippingAddress { get; set; }
        public DateTime? PickUpDate { get; set; }
        public DateTime? SubmissionDate { get; set; }
        public int? RequestStatus { get; set; }
        [ForeignKey("UserID")]
        public int? UserID { get; set; }
        public List<Orders> orders { get; set; }
    }
}
