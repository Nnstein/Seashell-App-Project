using System.Collections.Generic;
using Abp.Localization;
using Seashell.Resort.Install.Dto;

namespace Seashell.Resort.Web.Models.Install
{
    public class InstallViewModel
    {
        public List<ApplicationLanguage> Languages { get; set; }

        public AppSettingsJsonDto AppSettingsJson { get; set; }
    }
}
