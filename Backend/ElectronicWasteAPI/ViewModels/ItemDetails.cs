namespace ElectronicWasteAPI.ViewModels
{
    public class ItemDetails
    {
        public int? ItemID { get; set; }
        public string? Quality { get; set; }
        public int? CategoryID { get; set; }
       
    }
    public class Conditions
    {
        public int? QualityID { get; set; }
        public string? Condition { get; set; }
        public int? EstimatedPrice { get; set; }
    }
}
