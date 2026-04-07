using System.ComponentModel.DataAnnotations;

namespace ElectronicWasteAPI.Models
{
    public class Login
    {
        [Key]
        public int Code { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }


    }
}
