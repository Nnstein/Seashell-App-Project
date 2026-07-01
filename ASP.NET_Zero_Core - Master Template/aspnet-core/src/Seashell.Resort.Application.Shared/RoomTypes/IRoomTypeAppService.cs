using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Seashell.Resort.RoomTypes.Dto;

namespace Seashell.Resort.RoomTypes
{
    public interface IRoomTypeAppService : IApplicationService
    {
        Task<PagedResultDto<RoomTypeListDto>> GetRoomTypes(GetRoomTypesInput input);

        Task<RoomTypeDto> GetRoomType(EntityDto input);

        Task CreateRoomType(CreateRoomTypeDto input);

        Task UpdateRoomType(UpdateRoomTypeDto input);

        Task DeleteRoomType(EntityDto input);
    }
}
