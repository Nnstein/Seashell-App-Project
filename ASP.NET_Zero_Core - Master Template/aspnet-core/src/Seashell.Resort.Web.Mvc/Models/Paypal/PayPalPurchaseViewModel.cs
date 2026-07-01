using System.Linq;
using Seashell.Resort.MultiTenancy.Payments.Dto;
using Seashell.Resort.MultiTenancy.Payments.Paypal;

namespace Seashell.Resort.Web.Models.Paypal
{
    public class PayPalPurchaseViewModel
    {
        public SubscriptionPaymentDto Payment { get; set; }

        public decimal Amount { get; set; }

        public PayPalPaymentGatewayConfiguration Configuration { get; set; }

        public string GetDisabledFundingsQueryString()
        {
            if (Configuration.DisabledFundings == null || !Configuration.DisabledFundings.Any())
            {
                return "";
            }

            return "&disable-funding=" + string.Join(',', Configuration.DisabledFundings.ToList());
        }
    }
}
