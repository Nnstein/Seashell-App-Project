using Abp.Authorization;
using Seashell.Resort.Authorization.Roles;
using Seashell.Resort.Authorization.Users;

namespace Seashell.Resort.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {

        }
    }
}
