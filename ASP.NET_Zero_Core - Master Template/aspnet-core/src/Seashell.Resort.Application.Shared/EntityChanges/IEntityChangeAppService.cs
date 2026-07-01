using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Seashell.Resort.EntityChanges.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Seashell.Resort.EntityChanges
{
    public interface IEntityChangeAppService : IApplicationService
    {
        Task<ListResultDto<EntityAndPropertyChangeListDto>> GetEntityChangesByEntity(GetEntityChangesByEntityInput input);
    }
}
