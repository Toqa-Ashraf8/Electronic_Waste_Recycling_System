using System.ComponentModel.DataAnnotations;

namespace ElectronicWasteAPI.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? UserImagePath { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
    }
}
