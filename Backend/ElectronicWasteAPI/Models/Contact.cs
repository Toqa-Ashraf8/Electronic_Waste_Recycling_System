using System.ComponentModel.DataAnnotations;

namespace ElectronicWasteAPI.Models
{
    public class Contact
    {
        [Key]
        public int ContactID { get; set; }
        public string? PhoneSupport { get; set; }
        public string?  StartHour { get; set; }
        public string? EndHour { get; set; }
        public string? Email { get; set; }
        public string? WhatsAppNumber { get; set; }


    }
}
