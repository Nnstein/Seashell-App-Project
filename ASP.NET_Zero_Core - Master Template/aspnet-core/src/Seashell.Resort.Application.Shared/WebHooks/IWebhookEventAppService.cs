using System.Threading.Tasks;
using Abp.Webhooks;

namespace Seashell.Resort.WebHooks
{
    public interface IWebhookEventAppService
    {
        Task<WebhookEvent> Get(string id);
    }
}
