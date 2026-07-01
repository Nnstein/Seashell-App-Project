using Abp.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc;
using Seashell.Resort.Authorization;
using Seashell.Resort.DashboardCustomization;
using System.Threading.Tasks;
using Seashell.Resort.Web.Areas.AppAreaName.Startup;

namespace Seashell.Resort.Web.Areas.AppAreaName.Controllers
{
    [Area("AppAreaName")]
    [AbpMvcAuthorize(AppPermissions.Pages_Tenant_Dashboard)]
    public class TenantDashboardController : CustomizableDashboardControllerBase
    {
        public TenantDashboardController(DashboardViewConfiguration dashboardViewConfiguration, 
            IDashboardCustomizationAppService dashboardCustomizationAppService) 
            : base(dashboardViewConfiguration, dashboardCustomizationAppService)
        {

        }

        public async Task<ActionResult> Index()
        {
            return await GetView(AbpZeroTemplateDashboardCustomizationConsts.DashboardNames.DefaultTenantDashboard);
        }
    }
}