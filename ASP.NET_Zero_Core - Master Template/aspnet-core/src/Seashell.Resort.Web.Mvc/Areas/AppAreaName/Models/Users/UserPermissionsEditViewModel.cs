using Abp.AutoMapper;
using Seashell.Resort.Authorization.Users;
using Seashell.Resort.Authorization.Users.Dto;
using Seashell.Resort.Web.Areas.AppAreaName.Models.Common;

namespace Seashell.Resort.Web.Areas.AppAreaName.Models.Users
{
    [AutoMapFrom(typeof(GetUserPermissionsForEditOutput))]
    public class UserPermissionsEditViewModel : GetUserPermissionsForEditOutput, IPermissionsEditViewModel
    {
        public User User { get; set; }
    }
}