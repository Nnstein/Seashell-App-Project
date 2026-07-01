using Abp.AutoMapper;
using Abp.Configuration.Startup;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Seashell.Resort.ApiClient;
using Seashell.Resort.Maui.Core;

namespace Seashell.Resort.Maui
{
    [DependsOn(typeof(ResortClientModule), typeof(AbpAutoMapperModule))]
    public class ResortMauiModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Localization.IsEnabled = false;
            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;

            Configuration.ReplaceService<IApplicationContext, MauiApplicationContext>();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ResortMauiModule).GetAssembly());
        }
    }
}

