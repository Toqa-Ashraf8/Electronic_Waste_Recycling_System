

namespace ElectronicWasteAPI.ViewModels
{
    public class OrdersView
    {
        public int? RequestID { get; set; }
        public int? CategoryID { get; set; }
        public string? DeviceCategory { get; set; }
        public string? DeviceBrand { get; set; }
        public string? DeviceItem { get; set; }
        public string? DeviceQuality { get; set; }
        public string? DeviceCondition { get; set; }
        public int? EstimatedPrice { get; set; }
        public string? DeviceImagePath { get; set; }
        public int? PickUpMethod { get; set; }
        public string? ShippingAddress { get; set; }
        public DateTime? PickUpDate { get; set; }
        public int? ItemID { get; set; }
        public int? RequestStatus { get; set; }
        public DateTime? SubmissionDate { get; set; }
        public int? UserID { get; set; }
        public int? QualityID { get; set; }
        public int? OrderID { get; set; }
        public int? OrderStatus { get; set; }
        public string? Notes { get; set; }
        public DateTime? CheckDate { get; set; }
        public string? UserName { get; set; }
        public int? Points { get; set; }

    }
  
}
