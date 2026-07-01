using System.Threading.Tasks;
using Abp.Application.Services;
using Seashell.Resort.MultiTenancy.Dto;
using Seashell.Resort.MultiTenancy.Payments.Dto;

namespace Seashell.Resort.MultiTenancy
{
    public interface ISubscriptionAppService : IApplicationService
    {
        Task DisableRecurringPayments();

        Task EnableRecurringPayments();
        
        Task<long> StartExtendSubscription(StartExtendSubscriptionInput input);
        
        Task<StartUpgradeSubscriptionOutput> StartUpgradeSubscription(StartUpgradeSubscriptionInput input);
        
        Task<long> StartTrialToBuySubscription(StartTrialToBuySubscriptionInput input);
    }
}
