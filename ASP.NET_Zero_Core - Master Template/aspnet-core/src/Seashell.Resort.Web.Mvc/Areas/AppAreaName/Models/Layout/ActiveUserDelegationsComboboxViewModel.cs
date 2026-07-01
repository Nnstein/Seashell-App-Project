using System.Collections.Generic;
using Seashell.Resort.Authorization.Delegation;
using Seashell.Resort.Authorization.Users.Delegation.Dto;

namespace Seashell.Resort.Web.Areas.AppAreaName.Models.Layout
{
    public class ActiveUserDelegationsComboboxViewModel
    {
        public IUserDelegationConfiguration UserDelegationConfiguration { get; set; }

        public List<UserDelegationDto> UserDelegations { get; set; }

        public string CssClass { get; set; }
    }
}
