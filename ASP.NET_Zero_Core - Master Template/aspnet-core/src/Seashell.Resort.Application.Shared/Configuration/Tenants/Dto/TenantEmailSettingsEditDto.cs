using Abp.Auditing;
using Seashell.Resort.Configuration.Dto;

namespace Seashell.Resort.Configuration.Tenants.Dto
{
    public class TenantEmailSettingsEditDto : EmailSettingsEditDto
    {
        public bool UseHostDefaultEmailSettings { get; set; }
    }
}