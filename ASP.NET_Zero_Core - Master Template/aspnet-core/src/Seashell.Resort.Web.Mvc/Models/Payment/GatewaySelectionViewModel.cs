using System.Collections.Generic;
using System.Linq;
using Seashell.Resort.MultiTenancy.Payments;
using Seashell.Resort.MultiTenancy.Payments.Dto;

namespace Seashell.Resort.Web.Models.Payment
{
    public class GatewaySelectionViewModel
    {
        public SubscriptionPaymentDto Payment { get; set; }
        
        public List<PaymentGatewayModel> PaymentGateways { get; set; }

        public bool AllowRecurringPaymentOption()
        {
            return Payment.AllowRecurringPayment() && PaymentGateways.Any(gateway => gateway.SupportsRecurringPayments);
        }
    }
}
