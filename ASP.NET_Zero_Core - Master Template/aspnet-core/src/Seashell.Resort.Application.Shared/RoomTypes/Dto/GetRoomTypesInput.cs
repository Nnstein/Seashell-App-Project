using Abp.Runtime.Validation;
using Seashell.Resort.Dto;

namespace Seashell.Resort.RoomTypes.Dto
{
    public class GetRoomTypesInput : PagedAndSortedInputDto, IShouldNormalize
    {
        public string Filter { get; set; }
        public RoomCategory? Category { get; set; }
        public bool? IsActive { get; set; }

        public void Normalize()
        {
            if (string.IsNullOrEmpty(Sorting))
            {
                Sorting = "Name";
            }
        }
    }
}
