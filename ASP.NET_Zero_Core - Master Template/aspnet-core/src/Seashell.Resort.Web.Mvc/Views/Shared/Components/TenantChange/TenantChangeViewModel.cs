using Abp.AutoMapper;
using Seashell.Resort.Sessions.Dto;

namespace Seashell.Resort.Web.Views.Shared.Components.TenantChange
{
    [AutoMapFrom(typeof(GetCurrentLoginInformationsOutput))]
    public class TenantChangeViewModel
    {
        public TenantLoginInfoDto Tenant { get; set; }
    }
}