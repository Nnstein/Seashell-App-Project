using System.Threading.Tasks;
using Abp.Application.Services;
using Seashell.Resort.Install.Dto;

namespace Seashell.Resort.Install
{
    public interface IInstallAppService : IApplicationService
    {
        Task Setup(InstallDto input);

        AppSettingsJsonDto GetAppSettingsJson();

        CheckDatabaseOutput CheckDatabase();
    }
}