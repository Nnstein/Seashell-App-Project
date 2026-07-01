using System.Threading.Tasks;
using Abp.Application.Services;
using Seashell.Resort.MultiTenancy.Payments.PayPal.Dto;

namespace Seashell.Resort.MultiTenancy.Payments.PayPal
{
    public interface IPayPalPaymentAppService : IApplicationService
    {
        Task ConfirmPayment(long paymentId, string paypalOrderId);

        PayPalConfigurationDto GetConfiguration();
    }
}
