using Seashell.Resort.Maui.Models.NavigationMenu;

namespace Seashell.Resort.Maui.Services.Navigation
{
    public interface IMenuProvider
    {
        List<NavigationMenuItem> GetAuthorizedMenuItems(Dictionary<string, string> grantedPermissions);
    }
}

