using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Seashell.Resort.Web.Areas.AppAreaName.Models.Layout;
using Seashell.Resort.Web.Session;
using Seashell.Resort.Web.Views;

namespace Seashell.Resort.Web.Areas.AppAreaName.Views.Shared.Components.AppAreaNameLogo
{
    public class AppAreaNameLogoViewComponent : AbpZeroTemplateViewComponent
    {
        private readonly IPerRequestSessionCache _sessionCache;

        public AppAreaNameLogoViewComponent(
            IPerRequestSessionCache sessionCache
        )
        {
            _sessionCache = sessionCache;
        }

        public async Task<IViewComponentResult> InvokeAsync(string logoSkin = null, string logoClass = "")
        {
            var headerModel = new LogoViewModel
            {
                LoginInformations = await _sessionCache.GetCurrentLoginInformationsAsync(),
                LogoSkinOverride = logoSkin,
                LogoClassOverride = logoClass
            };

            return View(headerModel);
        }
    }
}
