using Abp.Auditing;
using System.ComponentModel.DataAnnotations;

namespace Seashell.Resort.Authorization.Accounts.Dto
{
    public class SendEmailActivationLinkInput
    {
        [Required]
        public string EmailAddress { get; set; }

        [DisableAuditing]
        public string CaptchaResponse { get; set; }
    }
}