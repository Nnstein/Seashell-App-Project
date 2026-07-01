using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using Seashell.Resort.RoomTypes.Dto;

namespace Seashell.Resort.RoomTypes
{
    public class RoomTypeAppService : AbpZeroTemplateAppServiceBase, IRoomTypeAppService
    {
        private readonly IRepository<RoomType> _roomTypeRepository;

        public RoomTypeAppService(IRepository<RoomType> roomTypeRepository)
        {
            _roomTypeRepository = roomTypeRepository;
        }

        public async Task<PagedResultDto<RoomTypeListDto>> GetRoomTypes(GetRoomTypesInput input)
        {
            var query = _roomTypeRepository.GetAll()
                .WhereIf(!input.Filter.IsNullOrEmpty(), t => t.Name.Contains(input.Filter) || t.Description.Contains(input.Filter))
                .WhereIf(input.Category.HasValue, t => t.Category == input.Category.Value)
                .WhereIf(input.IsActive.HasValue, t => t.IsActive == input.IsActive.Value);

            var totalCount = await query.CountAsync();

            var roomTypes = await query
                .OrderBy(input.Sorting ?? "Name")
                .PageBy(input)
                .ToListAsync();

            var roomTypeListDtos = ObjectMapper.Map<List<RoomTypeListDto>>(roomTypes);

            return new PagedResultDto<RoomTypeListDto>(
                totalCount,
                roomTypeListDtos
            );
        }

        public async Task<RoomTypeDto> GetRoomType(EntityDto input)
        {
            var roomType = await _roomTypeRepository.GetAsync(input.Id);
            return ObjectMapper.Map<RoomTypeDto>(roomType);
        }

        public async Task CreateRoomType(CreateRoomTypeDto input)
        {
            var roomType = ObjectMapper.Map<RoomType>(input);
            await _roomTypeRepository.InsertAsync(roomType);
        }

        public async Task UpdateRoomType(UpdateRoomTypeDto input)
        {
            var roomType = await _roomTypeRepository.GetAsync(input.Id);
            ObjectMapper.Map(input, roomType);
            await _roomTypeRepository.UpdateAsync(roomType);
        }

        public async Task DeleteRoomType(EntityDto input)
        {
            await _roomTypeRepository.DeleteAsync(input.Id);
        }
    }
}
