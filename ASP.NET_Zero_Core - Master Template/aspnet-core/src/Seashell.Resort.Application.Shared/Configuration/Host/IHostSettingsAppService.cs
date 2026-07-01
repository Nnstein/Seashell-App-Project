using System.Threading.Tasks;
using Abp.Application.Services;
using Seashell.Resort.Configuration.Host.Dto;

namespace Seashell.Resort.Configuration.Host
{
    public interface IHostSettingsAppService : IApplicationService
    {
        Task<HostSettingsEditDto> GetAllSettings();

        Task UpdateAllSettings(HostSettingsEditDto input);

        Task SendTestEmail(SendTestEmailInput input);
    }
}
