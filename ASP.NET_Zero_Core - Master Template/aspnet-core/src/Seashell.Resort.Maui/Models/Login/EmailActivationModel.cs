using System.ComponentModel.DataAnnotations;
using Seashell.Resort.Validation;

namespace Seashell.Resort.Maui.Models.Login
{
    public class EmailActivationModel
    {
        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }
    }
}


