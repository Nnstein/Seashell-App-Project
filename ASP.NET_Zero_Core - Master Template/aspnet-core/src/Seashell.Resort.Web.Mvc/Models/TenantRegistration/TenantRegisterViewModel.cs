using Seashell.Resort.Editions;
using Seashell.Resort.Editions.Dto;
using Seashell.Resort.MultiTenancy.Payments;
using Seashell.Resort.Security;
using Seashell.Resort.MultiTenancy.Payments.Dto;

namespace Seashell.Resort.Web.Models.TenantRegistration
{
    public class TenantRegisterViewModel
    {
        public int? EditionId { get; set; }

        public EditionSelectDto Edition { get; set; }
        
        public PasswordComplexitySetting PasswordComplexitySetting { get; set; }

        public EditionPaymentType EditionPaymentType { get; set; }
        
        public SubscriptionStartType? SubscriptionStartType { get; set; }
        
        public PaymentPeriodType? PaymentPeriodType { get; set; }
        
        public string SuccessUrl { get; set; }
        
        public string ErrorUrl { get; set; }
    }
}
