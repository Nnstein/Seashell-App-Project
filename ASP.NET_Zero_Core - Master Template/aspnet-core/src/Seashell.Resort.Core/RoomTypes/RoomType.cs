using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;

namespace Seashell.Resort.RoomTypes
{
    [Table("AppRoomTypes")]
    public class RoomType : Entity, IMustHaveTenant
    {
        [Required]
        [StringLength(128)]
        public string Name { get; set; }

        [Required]
        [StringLength(128)]
        public string NameAr { get; set; }

        public RoomCategory Category { get; set; } // Chalet, Room, Suite

        public string Description { get; set; }

        public string DescriptionAr { get; set; }

        public int MaxAdults { get; set; }

        public int MaxChildren { get; set; }

        public int SizeSqm { get; set; }

        public string AmenitiesJson { get; set; } // JSON array of amenity categories

        [StringLength(512)]
        public string ImageUrl { get; set; }

        public bool IsActive { get; set; } = true;

        public int TenantId { get; set; }
    }
}
