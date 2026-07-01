using Seashell.Resort.Dto;

namespace Seashell.Resort.WebHooks.Dto
{
    public class GetAllSendAttemptsInput : PagedInputDto
    {
        public string SubscriptionId { get; set; }
    }
}
