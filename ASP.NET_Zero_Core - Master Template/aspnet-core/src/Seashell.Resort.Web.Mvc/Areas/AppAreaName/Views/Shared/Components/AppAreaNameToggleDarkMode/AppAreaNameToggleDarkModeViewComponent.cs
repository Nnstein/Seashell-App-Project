using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Seashell.Resort.Web.Areas.AppAreaName.Models.Layout;
using Seashell.Resort.Web.Views;

namespace Seashell.Resort.Web.Areas.AppAreaName.Views.Shared.Components.AppAreaNameToggleDarkMode
{
    public class AppAreaNameToggleDarkModeViewComponent : AbpZeroTemplateViewComponent
    {
        public Task<IViewComponentResult> InvokeAsync(string cssClass, bool isDarkModeActive)
        {
            return Task.FromResult<IViewComponentResult>(View(new ToggleDarkModeViewModel(cssClass, isDarkModeActive)));
        }
    }
}