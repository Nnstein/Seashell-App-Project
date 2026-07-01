using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Seashell.Resort.Caching.Dto;

namespace Seashell.Resort.Caching
{
    public interface ICachingAppService : IApplicationService
    {
        ListResultDto<CacheDto> GetAllCaches();

        Task ClearCache(EntityDto<string> input);

        Task ClearAllCaches();
        
        bool CanClearAllCaches();
    }
}
