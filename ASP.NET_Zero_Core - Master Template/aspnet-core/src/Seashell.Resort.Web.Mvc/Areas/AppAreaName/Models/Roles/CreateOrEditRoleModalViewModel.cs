using Abp.AutoMapper;
using Seashell.Resort.Authorization.Roles.Dto;
using Seashell.Resort.Web.Areas.AppAreaName.Models.Common;

namespace Seashell.Resort.Web.Areas.AppAreaName.Models.Roles
{
    [AutoMapFrom(typeof(GetRoleForEditOutput))]
    public class CreateOrEditRoleModalViewModel : GetRoleForEditOutput, IPermissionsEditViewModel
    {
        public bool IsEditMode => Role.Id.HasValue;
    }
}