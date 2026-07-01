using Abp.Modules;
using Abp.Reflection.Extensions;

namespace Seashell.Resort
{
    public class ResortClientModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ResortClientModule).GetAssembly());
        }
    }
}
