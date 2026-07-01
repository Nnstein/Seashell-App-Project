using Abp.AutoMapper;
using Seashell.Resort.MultiTenancy.Dto;

namespace Seashell.Resort.Web.Models.TenantRegistration
{
    [AutoMapFrom(typeof(RegisterTenantOutput))]
    public class TenantRegisterResultViewModel : RegisterTenantOutput
    {
        public string TenantLoginAddress { get; set; }
    }
}