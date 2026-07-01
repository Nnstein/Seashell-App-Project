using Abp.Dependency;
using Abp.Extensions;
using Abp.Runtime.Session;
using Seashell.Resort.Editions;
using Seashell.Resort.ExtraProperties;
using Seashell.Resort.MultiTenancy.Payments;
using Seashell.Resort.Url;

namespace Seashell.Resort.Web.Url
{
    public class PaymentUrlGenerator : IPaymentUrlGenerator, ITransientDependency
    {
        private readonly IWebUrlService _webUrlService;

        public PaymentUrlGenerator(
            IWebUrlService webUrlService)
        {
            _webUrlService = webUrlService;
        }

        public string CreatePaymentRequestUrl(SubscriptionPayment subscriptionPayment)
        {
            var webSiteRootAddress = _webUrlService.GetSiteRootAddress();

            var url = webSiteRootAddress.EnsureEndsWith('/') +
                      "Payment/GatewaySelection" +
                      "?paymentId=" + subscriptionPayment.Id;

            return url;
        }
    }
}