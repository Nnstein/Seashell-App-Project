using Abp.Application.Services;
using Seashell.Resort.Dto;
using Seashell.Resort.Logging.Dto;

namespace Seashell.Resort.Logging
{
    public interface IWebLogAppService : IApplicationService
    {
        GetLatestWebLogsOutput GetLatestWebLogs();

        FileDto DownloadWebLogs();
    }
}
