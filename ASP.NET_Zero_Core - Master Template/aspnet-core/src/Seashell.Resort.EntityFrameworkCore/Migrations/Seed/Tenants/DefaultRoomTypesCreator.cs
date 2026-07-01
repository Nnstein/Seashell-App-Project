using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Seashell.Resort.EntityFrameworkCore;
using Seashell.Resort.RoomTypes;

namespace Seashell.Resort.Migrations.Seed.Tenants
{
    public class DefaultRoomTypesCreator
    {
        private readonly AbpZeroTemplateDbContext _context;

        public DefaultRoomTypesCreator(AbpZeroTemplateDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateRoomTypes();
        }

        private void CreateRoomTypes()
        {
            var roomTypes = new List<RoomType>
            {
                new RoomType
                {
                    Name = "Two Bedroom Chalet (First Floor)",
                    NameAr = "شاليه غرفتين (الطابق الأول)",
                    Category = RoomCategory.Chalet,
                    Description = "Ideal chalet in the heart of SeaShell with a view to relax and unwind. Features a cozy balcony with partial pool view.",
                    DescriptionAr = "شاليه مثالي في قلب سي شيل مع إطلالة للاسترخاء والراحة. يتميز بشرفة مريحة مع إطلالة جزئية على المسبح.",
                    MaxAdults = 4,
                    MaxChildren = 2,
                    SizeSqm = 79,
                    AmenitiesJson = "[\"Telephone\",\"2 TVs (32in & 42in)\",\"Complimentary Wi-Fi\",\"Toiletries and dental kits\",\"2 cotton bathrobes\",\"2 pairs of slippers\",\"Shaving kit\",\"King or twin beds\",\"1 roll-over bed available (fee)\",\"Baby cots available\",\"Extra blankets and pillows (upon request)\",\"Equipped kitchenette\",\"24/7 Room service\",\"Daily housekeeping\",\"Laundry and dry cleaning (fee)\",\"Club car rides (upon request)\",\"Complimentary parking (1 car)\"]",
                    ImageUrl = "assets/rooms/2br-chalet-first.jpg",
                    IsActive = true,
                    TenantId = 1
                },
                new RoomType
                {
                    Name = "Two Bedroom Chalet (Ground Floor)",
                    NameAr = "شاليه غرفتين (الطابق الأرضي)",
                    Category = RoomCategory.Chalet,
                    Description = "Same as first floor chalet but features an outdoor terrace designed for barbecue gatherings.",
                    DescriptionAr = "نفس الشاليه في الطابق الأول ولكن يتميز بتراس خارجي مصمم للتجمعات وحفلات الشواء.",
                    MaxAdults = 4,
                    MaxChildren = 2,
                    SizeSqm = 74,
                    AmenitiesJson = "[\"Telephone\",\"2 TVs (32in & 42in)\",\"Complimentary Wi-Fi\",\"Toiletries and dental kits\",\"2 cotton bathrobes\",\"2 pairs of slippers\",\"Shaving kit\",\"King or twin beds\",\"1 roll-over bed available (fee)\",\"Baby cots available\",\"Extra blankets and pillows (upon request)\",\"Equipped kitchenette\",\"24/7 Room service\",\"Daily housekeeping\",\"Laundry and dry cleaning (fee)\",\"Club car rides (upon request)\",\"Complimentary parking (1 car)\"]",
                    ImageUrl = "assets/rooms/2br-chalet-ground.jpg",
                    IsActive = true,
                    TenantId = 1
                },
                new RoomType
                {
                    Name = "Three Bedroom Chalet (No View)",
                    NameAr = "شاليه ثلاث غرف (بدون إطلالة)",
                    Category = RoomCategory.Chalet,
                    Description = "Features three bedrooms, three bathrooms, storage room, fully equipped kitchen, living room and private terrace.",
                    DescriptionAr = "يتميز بثلاث غرف نوم وثلاثة حمامات وغرفة تخزين ومطبخ مجهز بالكامل وغرفة معيشة وتراس خاص.",
                    MaxAdults = 6,
                    MaxChildren = 3,
                    SizeSqm = 120,
                    AmenitiesJson = "[\"Telephone\",\"Complimentary Wi-Fi\",\"24/7 Room service\",\"Daily housekeeping\",\"Laundry and dry cleaning (fee)\",\"Club car rides (upon request)\",\"Complimentary parking (1 car)\"]",
                    ImageUrl = "assets/rooms/3br-chalet.jpg",
                    IsActive = true,
                    TenantId = 1
                },
                new RoomType
                {
                    Name = "Three Bedroom Chalet (Garden View)",
                    NameAr = "شاليه ثلاث غرف (إطلالة حديقة)",
                    Category = RoomCategory.Chalet,
                    Description = "Two-level villa overlooking the main hotel garden. Features three bedrooms, three bathrooms, storage room. Overlooks garden and swimming pool.",
                    DescriptionAr = "فيلا من مستويين تطل على حديقة الفندق الرئيسية. تتميز بثلاث غرف نوم وثلاثة حمامات وغرفة تخزين وتطل على الحديقة وحمام السباحة.",
                    MaxAdults = 6,
                    MaxChildren = 3,
                    SizeSqm = 130,
                    AmenitiesJson = "[\"Telephone\",\"Complimentary Wi-Fi\",\"24/7 Room service\",\"Daily housekeeping\",\"Laundry and dry cleaning (fee)\",\"Club car rides (upon request)\",\"Complimentary parking (1 car)\"]",
                    ImageUrl = "assets/rooms/3br-garden-view.jpg",
                    IsActive = true,
                    TenantId = 1
                },
                new RoomType
                {
                    Name = "Four Bedroom Chalet (Panoramic View)",
                    NameAr = "شاليه أربع غرف (إطلالة بانورامية)",
                    Category = RoomCategory.Chalet,
                    Description = "Located in the center of the resort, overlooking the main swimming pool and garden. Master bedroom on upper level with seaside view.",
                    DescriptionAr = "يقع في وسط المنتجع، ويطل على المسبح الرئيسي والحديقة. غرفة نوم رئيسية في الطابق العلوي مع إطلالة على البحر.",
                    MaxAdults = 8,
                    MaxChildren = 4,
                    SizeSqm = 180,
                    AmenitiesJson = "[\"Telephone\",\"Complimentary Wi-Fi\",\"24/7 Room service\",\"Daily housekeeping\",\"Laundry and dry cleaning (fee)\",\"Club car rides (upon request)\",\"Complimentary parking (1 car)\"]",
                    ImageUrl = "assets/rooms/4br-panoramic.jpg",
                    IsActive = true,
                    TenantId = 1
                },
                new RoomType
                {
                    Name = "Beach Front Four Bedroom Chalet",
                    NameAr = "شاليه أربع غرف بإطلالة بحرية",
                    Category = RoomCategory.Chalet,
                    Description = "Faces the sea with wonderful view. Four bedrooms, four bathrooms, storage room with equipped kitchen and living room for family gatherings.",
                    DescriptionAr = "يواجه البحر مع إطلالة رائعة. أربع غرف نوم، أربعة حمامات، غرفة تخزين مع مطبخ مجهز وغرفة معيشة للتجمعات العائلية.",
                    MaxAdults = 8,
                    MaxChildren = 4,
                    SizeSqm = 200,
                    AmenitiesJson = "[\"Telephone\",\"Complimentary Wi-Fi\",\"24/7 Room service\",\"Daily housekeeping\",\"Laundry and dry cleaning (fee)\",\"Club car rides (upon request)\",\"Complimentary parking (1 car)\"]",
                    ImageUrl = "assets/rooms/4br-beachfront.jpg",
                    IsActive = true,
                    TenantId = 1
                },
                new RoomType
                {
                    Name = "Beach Patio Four Bedroom Chalet",
                    NameAr = "شاليه أربع غرف بفناء بحري",
                    Category = RoomCategory.Chalet,
                    Description = "Beach view chalet with unique patio. Terrace designed for dinner parties and family gatherings.",
                    DescriptionAr = "شاليه بإطلالة على الشاطئ مع فناء فريد. تراس مصمم لحفلات العشاء والتجمعات العائلية.",
                    MaxAdults = 8,
                    MaxChildren = 4,
                    SizeSqm = 210,
                    AmenitiesJson = "[\"Telephone\",\"Complimentary Wi-Fi\",\"24/7 Room service\",\"Daily housekeeping\",\"Laundry and dry cleaning (fee)\",\"Club car rides (upon request)\",\"Complimentary parking (1 car)\"]",
                    ImageUrl = "assets/rooms/4br-beach-patio.jpg",
                    IsActive = true,
                    TenantId = 1
                },
                new RoomType
                {
                    Name = "Private Pool Four Bedroom Chalet",
                    NameAr = "شاليه أربع غرف بمسبح خاص",
                    Category = RoomCategory.Chalet,
                    Description = "Exclusive private pool chalet for family gatherings. Beach view with outdoor dining.",
                    DescriptionAr = "شاليه حصري بمسبح خاص للتجمعات العائلية. إطلالة على الشاطئ مع منطقة لتناول الطعام في الهواء الطلق.",
                    MaxAdults = 8,
                    MaxChildren = 4,
                    SizeSqm = 220,
                    AmenitiesJson = "[\"Telephone\",\"Complimentary Wi-Fi\",\"24/7 Room service\",\"Daily housekeeping\",\"Laundry and dry cleaning (fee)\",\"Club car rides (upon request)\",\"Complimentary parking (1 car)\"]",
                    ImageUrl = "assets/rooms/4br-private-pool.jpg",
                    IsActive = true,
                    TenantId = 1
                },
                new RoomType
                {
                    Name = "Standard Room (King Bed)",
                    NameAr = "غرفة قياسية (سرير كينج)",
                    Category = RoomCategory.Room,
                    Description = "Simple room above the reception with view of main courtyard, cafe Presto, and fountain.",
                    DescriptionAr = "غرفة بسيطة فوق الاستقبال مع إطلالة على الفناء الرئيسي ومقهى بريستو والنافورة.",
                    MaxAdults = 2,
                    MaxChildren = 1,
                    SizeSqm = 36,
                    AmenitiesJson = "[\"Telephone\",\"TV (32in)\",\"Complimentary Wi-Fi\",\"In-room safe box\",\"Mini-bar\",\"Toiletries and dental kits\",\"2 cotton bathrobes\",\"2 pairs of slippers\",\"Shaving kit (upon request)\",\"King or twin beds\",\"Baby cots available\",\"Extra blankets and pillows (upon request)\",\"Free access to pools and beach\",\"24/7 Room service\",\"Daily housekeeping\",\"Laundry and dry cleaning (fee)\"]",
                    ImageUrl = "assets/rooms/standard-king.jpg",
                    IsActive = true,
                    TenantId = 1
                },
                new RoomType
                {
                    Name = "Studio (First Floor)",
                    NameAr = "استوديو (الطابق الأول)",
                    Category = RoomCategory.Room,
                    Description = "Spacious studio for small families with view of resort's garden and Avenue's swimming pool.",
                    DescriptionAr = "استوديو واسع للعائلات الصغيرة مع إطلالة على حديقة المنتجع ومسبح أفينيو.",
                    MaxAdults = 2,
                    MaxChildren = 1,
                    SizeSqm = 40,
                    AmenitiesJson = "[\"Telephone\",\"TV\",\"Complimentary Wi-Fi\",\"Mini-bar\",\"Free access to pools and beach\",\"24/7 Room service\",\"Daily housekeeping\"]",
                    ImageUrl = "assets/rooms/studio-first.jpg",
                    IsActive = true,
                    TenantId = 1
                },
                new RoomType
                {
                    Name = "Junior Suite (First Floor)",
                    NameAr = "جناح جونيور (الطابق الأول)",
                    Category = RoomCategory.Room,
                    Description = "Spacious suite for small families with view of resort's garden and Avenue's swimming pool.",
                    DescriptionAr = "جناح واسع للعائلات الصغيرة مع إطلالة على حديقة المنتجع ومسبح أفينيو.",
                    MaxAdults = 2,
                    MaxChildren = 1,
                    SizeSqm = 48,
                    AmenitiesJson = "[\"Telephone\",\"2 TVs (50in)\",\"Complimentary Wi-Fi\",\"Mini-bar\",\"Toiletries and dental kits\",\"2 cotton bathrobes\",\"2 pairs of slippers\",\"Shaving kit\",\"King bed\",\"1 roll-over bed available (fee)\",\"Baby cots available\",\"Free access to pools and beach\",\"24/7 Room service\",\"Daily housekeeping\"]",
                    ImageUrl = "assets/rooms/junior-suite.jpg",
                    IsActive = true,
                    TenantId = 1
                },
                new RoomType
                {
                    Name = "Superior Room",
                    NameAr = "غرفة فاخرة",
                    Category = RoomCategory.Room,
                    Description = "Designed for comfort and relaxation with exclusive jacuzzi.",
                    DescriptionAr = "مصممة للراحة والاسترخاء مع جاكوزي خاص.",
                    MaxAdults = 2,
                    MaxChildren = 1,
                    SizeSqm = 45,
                    AmenitiesJson = "[\"Telephone\",\"TV\",\"Complimentary Wi-Fi\",\"Mini-bar\",\"In-room safe\",\"Free access to pools and beach\",\"24/7 Room service\",\"Daily housekeeping\"]",
                    ImageUrl = "assets/rooms/superior.jpg",
                    IsActive = true,
                    TenantId = 1
                },
                new RoomType
                {
                    Name = "Presidential Suite",
                    NameAr = "الجناح الرئاسي",
                    Category = RoomCategory.Room,
                    Description = "Spacious living room with king-sized bed, jacuzzi and shower overlooking main courtyard. Interconnected rooms available.",
                    DescriptionAr = "غرفة معيشة واسعة مع سرير كينج وجاكوزي ودش يطل على الفناء الرئيسي. تتوفر غرف متصلة.",
                    MaxAdults = 2,
                    MaxChildren = 1,
                    SizeSqm = 73,
                    AmenitiesJson = "[\"Telephone\",\"TV (42in + 32in)\",\"Complimentary Wi-Fi\",\"Mini-bar\",\"In-room safe\",\"Home theater stereos\",\"Free access to pools and beach\",\"24/7 Room service\",\"Daily housekeeping\"]",
                    ImageUrl = "assets/rooms/presidential.jpg",
                    IsActive = true,
                    TenantId = 1
                }
            };

            foreach (var roomType in roomTypes)
            {
                if (!_context.RoomTypes.IgnoreQueryFilters().Any(r => r.Name == roomType.Name && r.TenantId == roomType.TenantId))
                {
                    _context.RoomTypes.Add(roomType);
                }
            }

            _context.SaveChanges();
        }
    }
}
