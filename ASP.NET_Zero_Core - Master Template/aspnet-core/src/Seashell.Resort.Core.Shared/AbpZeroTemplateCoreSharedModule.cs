using Abp.Modules;
using Abp.Reflection.Extensions;

namespace Seashell.Resort
{
    public class AbpZeroTemplateCoreSharedModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AbpZeroTemplateCoreSharedModule).GetAssembly());
        }
    }
}