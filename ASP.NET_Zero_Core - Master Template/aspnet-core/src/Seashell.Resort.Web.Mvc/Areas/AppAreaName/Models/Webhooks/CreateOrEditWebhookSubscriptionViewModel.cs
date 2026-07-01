using Abp.Application.Services.Dto;
using Abp.Webhooks;
using Seashell.Resort.WebHooks.Dto;

namespace Seashell.Resort.Web.Areas.AppAreaName.Models.Webhooks
{
    public class CreateOrEditWebhookSubscriptionViewModel
    {
        public WebhookSubscription WebhookSubscription { get; set; }

        public ListResultDto<GetAllAvailableWebhooksOutput> AvailableWebhookEvents { get; set; }
    }
}
