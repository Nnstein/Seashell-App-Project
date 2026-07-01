using System.Threading.Tasks;
using Abp.Application.Services;
using Seashell.Resort.MultiTenancy.Payments.Dto;
using Seashell.Resort.MultiTenancy.Payments.Stripe.Dto;

namespace Seashell.Resort.MultiTenancy.Payments.Stripe
{
    public interface IStripePaymentAppService : IApplicationService
    {
        Task ConfirmPayment(StripeConfirmPaymentInput input);

        StripeConfigurationDto GetConfiguration();
        
        Task<string> CreatePaymentSession(StripeCreatePaymentSessionInput input);
    }
}