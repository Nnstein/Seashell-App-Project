using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Seashell.Resort.Editions.Dto;

namespace Seashell.Resort.MultiTenancy.Dto
{
    public class GetTenantFeaturesEditOutput
    {
        public List<NameValueDto> FeatureValues { get; set; }

        public List<FlatFeatureDto> Features { get; set; }
    }
}