using System.ComponentModel.DataAnnotations;

namespace Seashell.Resort.RoomTypes.Dto
{
    public class CreateRoomTypeDto
    {
        [Required]
        [StringLength(128)]
        public string Name { get; set; }

        [Required]
        [StringLength(128)]
        public string NameAr { get; set; }

        public RoomCategory Category { get; set; }

        public string Description { get; set; }

        public string DescriptionAr { get; set; }

        public int MaxAdults { get; set; }

        public int MaxChildren { get; set; }

        public int SizeSqm { get; set; }

        public string AmenitiesJson { get; set; }

        [StringLength(512)]
        public string ImageUrl { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
