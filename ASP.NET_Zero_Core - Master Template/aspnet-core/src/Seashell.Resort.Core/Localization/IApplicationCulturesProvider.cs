using System.Globalization;

namespace Seashell.Resort.Localization
{
    public interface IApplicationCulturesProvider
    {
        CultureInfo[] GetAllCultures();
    }
}