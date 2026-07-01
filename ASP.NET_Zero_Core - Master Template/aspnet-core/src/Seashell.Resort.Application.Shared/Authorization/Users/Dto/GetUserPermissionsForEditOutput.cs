using System.Collections.Generic;
using Seashell.Resort.Authorization.Permissions.Dto;

namespace Seashell.Resort.Authorization.Users.Dto
{
    public class GetUserPermissionsForEditOutput
    {
        public List<FlatPermissionDto> Permissions { get; set; }

        public List<string> GrantedPermissionNames { get; set; }
    }
}