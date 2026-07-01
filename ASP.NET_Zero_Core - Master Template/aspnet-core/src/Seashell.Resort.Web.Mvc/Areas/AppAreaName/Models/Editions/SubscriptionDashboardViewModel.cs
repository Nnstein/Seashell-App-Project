using Seashell.Resort.MultiTenancy.Dto;
using Seashell.Resort.Sessions.Dto;

namespace Seashell.Resort.Web.Areas.AppAreaName.Models.Editions
{
    public class SubscriptionDashboardViewModel
    {
        public GetCurrentLoginInformationsOutput LoginInformations { get; set; }
        
        public EditionsSelectOutput Editions { get; set; }
    }
}
