using Microsoft.AspNetCore.Mvc;
using Seashell.Resort.Web.Controllers;

namespace Seashell.Resort.Web.Public.Controllers
{
    public class HomeController : AbpZeroTemplateControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}