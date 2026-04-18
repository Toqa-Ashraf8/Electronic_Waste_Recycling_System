using System.ComponentModel.DataAnnotations;

namespace ElectronicWasteAPI.Models
{
    public class Branch
    {
        [Key]
        public int BranchID { get; set; }
        public string? BranchName { get; set; }
        public string? Location { get; set; }
        public string? BranchPhone { get; set; }
        public string? WorkingHours { get; set; }
        public string? MapLink { get; set; }

    }
}
