using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Seashell.Resort.Web.Areas.AppAreaName.Models.Layout;
using Seashell.Resort.Web.Session;
using Seashell.Resort.Web.Views;

namespace Seashell.Resort.Web.Areas.AppAreaName.Views.Shared.Themes.Theme9.Components.AppAreaNameTheme9Footer
{
    public class AppAreaNameTheme9FooterViewComponent : AbpZeroTemplateViewComponent
    {
        private readonly IPerRequestSessionCache _sessionCache;

        public AppAreaNameTheme9FooterViewComponent(IPerRequestSessionCache sessionCache)
        {
            _sessionCache = sessionCache;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var footerModel = new FooterViewModel
            {
                LoginInformations = await _sessionCache.GetCurrentLoginInformationsAsync()
            };

            return View(footerModel);
        }
    }
}
