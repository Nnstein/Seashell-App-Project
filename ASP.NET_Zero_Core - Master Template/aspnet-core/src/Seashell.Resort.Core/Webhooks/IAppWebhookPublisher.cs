using System.Threading.Tasks;
using Seashell.Resort.Authorization.Users;

namespace Seashell.Resort.WebHooks
{
    public interface IAppWebhookPublisher
    {
        Task PublishTestWebhook();
    }
}
