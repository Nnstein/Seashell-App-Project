using Abp.Zero.Ldap.Authentication;
using Abp.Zero.Ldap.Configuration;
using Seashell.Resort.Authorization.Users;
using Seashell.Resort.MultiTenancy;

namespace Seashell.Resort.Authorization.Ldap
{
    public class AppLdapAuthenticationSource : LdapAuthenticationSource<Tenant, User>
    {
        public AppLdapAuthenticationSource(ILdapSettings settings, IAbpZeroLdapModuleConfig ldapModuleConfig)
            : base(settings, ldapModuleConfig)
        {
        }
    }
}