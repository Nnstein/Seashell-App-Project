using Abp.AutoMapper;
using Seashell.Resort.Organizations.Dto;

namespace Seashell.Resort.Maui.Models.User
{
    [AutoMapFrom(typeof(OrganizationUnitDto))]
    public class OrganizationUnitModel : OrganizationUnitDto
    {
        public bool IsAssigned { get; set; }
    }
}


