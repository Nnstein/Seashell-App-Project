using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Seashell.Resort.Editions.Dto;

namespace Seashell.Resort.Web.Areas.AppAreaName.Models.Common
{
    public interface IFeatureEditViewModel
    {
        List<NameValueDto> FeatureValues { get; set; }

        List<FlatFeatureDto> Features { get; set; }
    }
}