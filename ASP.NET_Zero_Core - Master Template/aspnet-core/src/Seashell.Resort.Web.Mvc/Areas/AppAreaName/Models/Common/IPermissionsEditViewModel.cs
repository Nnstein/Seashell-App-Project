using System.Collections.Generic;
using Seashell.Resort.Authorization.Permissions.Dto;

namespace Seashell.Resort.Web.Areas.AppAreaName.Models.Common
{
    public interface IPermissionsEditViewModel
    {
        List<FlatPermissionDto> Permissions { get; set; }

        List<string> GrantedPermissionNames { get; set; }
    }
}