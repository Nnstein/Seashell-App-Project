using System.Collections.Generic;
using Seashell.Resort.Caching.Dto;

namespace Seashell.Resort.Web.Areas.AppAreaName.Models.Maintenance
{
    public class MaintenanceViewModel
    {
        public IReadOnlyList<CacheDto> Caches { get; set; }
        
        public bool CanClearAllCaches { get; set; }
    }
}