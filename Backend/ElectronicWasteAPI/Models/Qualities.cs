using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ElectronicWasteAPI.Models
{
    public class Qualities
    {
        [Key]
        public int QualityID { get; set; }
        [ForeignKey("CategoryID")]
        public int? CategoryID { get; set; }
        public string? Quality { get; set; }
        public string? Condition { get; set; }
        public int? EstimatedPrice { get; set; }
    }
}
