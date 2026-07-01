using Abp.Application.Services.Dto;

namespace Seashell.Resort.RoomTypes.Dto
{
    public class RoomTypeDto : EntityDto
    {
        public string Name { get; set; }
        public string NameAr { get; set; }
        public RoomCategory Category { get; set; }
        public string Description { get; set; }
        public string DescriptionAr { get; set; }
        public int MaxAdults { get; set; }
        public int MaxChildren { get; set; }
        public int SizeSqm { get; set; }
        public string AmenitiesJson { get; set; }
        public string ImageUrl { get; set; }
        public bool IsActive { get; set; }
    }
}
