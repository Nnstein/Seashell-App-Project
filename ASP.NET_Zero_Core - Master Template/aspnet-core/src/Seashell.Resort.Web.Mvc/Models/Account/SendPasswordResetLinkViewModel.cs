using System.ComponentModel.DataAnnotations;

namespace Seashell.Resort.Web.Models.Account
{
    public class SendPasswordResetLinkViewModel
    {
        [Required]
        public string EmailAddress { get; set; }
    }
}