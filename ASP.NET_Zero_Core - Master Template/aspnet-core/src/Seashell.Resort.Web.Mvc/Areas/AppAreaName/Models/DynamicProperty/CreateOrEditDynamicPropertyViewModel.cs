using System.Collections.Generic;
using Seashell.Resort.DynamicEntityProperties.Dto;

namespace Seashell.Resort.Web.Areas.AppAreaName.Models.DynamicProperty
{
    public class CreateOrEditDynamicPropertyViewModel
    {
        public DynamicPropertyDto DynamicPropertyDto { get; set; }

        public List<string> AllowedInputTypes { get; set; }
    }
}
