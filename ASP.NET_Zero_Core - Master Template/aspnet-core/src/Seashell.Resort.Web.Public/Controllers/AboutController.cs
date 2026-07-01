using Microsoft.AspNetCore.Mvc;
using Seashell.Resort.Web.Controllers;

namespace Seashell.Resort.Web.Public.Controllers
{
    public class AboutController : AbpZeroTemplateControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}