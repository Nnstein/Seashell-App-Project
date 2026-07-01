using Abp.AspNetCore.Mvc.Authorization;
using Seashell.Resort.Authorization.Users.Profile;
using Seashell.Resort.Graphics;
using Seashell.Resort.Storage;

namespace Seashell.Resort.Web.Controllers
{
    [AbpMvcAuthorize]
    public class ProfileController : ProfileControllerBase
    {
        public ProfileController(
            ITempFileCacheManager tempFileCacheManager,
            IProfileAppService profileAppService,
            IImageValidator imageValidator) :
            base(tempFileCacheManager, profileAppService, imageValidator)
        {
        }
    }
}