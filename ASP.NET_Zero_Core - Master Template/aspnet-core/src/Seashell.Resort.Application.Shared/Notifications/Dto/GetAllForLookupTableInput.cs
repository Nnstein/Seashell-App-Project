using Abp.Application.Services.Dto;

namespace Seashell.Resort.Notifications.Dto
{
    public class GetAllForLookupTableInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
    }
}