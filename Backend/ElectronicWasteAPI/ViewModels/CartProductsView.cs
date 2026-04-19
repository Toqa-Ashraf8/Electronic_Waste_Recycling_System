namespace ElectronicWasteAPI.ViewModels
{
    public class CartProductsView
    {
        public int? CategoryID { get; set; }
        public string? CategoryName { get; set; }
        public int? ProductID { get; set; }
        public int? serial { get; set; }
        public string? ProductName { get; set; }
        public int? ProductPrice { get; set; }
        public int? Stock { get; set; }
        public int? Points { get; set; }
        public string? ProductImagePath { get; set; }
        public string? Description { get; set; }

    }
}
