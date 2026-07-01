using Microsoft.Extensions.Configuration;

namespace Seashell.Resort.Configuration
{
    public interface IAppConfigurationAccessor
    {
        IConfigurationRoot Configuration { get; }
    }
}
