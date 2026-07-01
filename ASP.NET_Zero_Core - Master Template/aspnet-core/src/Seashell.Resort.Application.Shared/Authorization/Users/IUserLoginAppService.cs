using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Seashell.Resort.Authorization.Users.Dto;

namespace Seashell.Resort.Authorization.Users
{
    public interface IUserLoginAppService : IApplicationService
    {
        Task<PagedResultDto<UserLoginAttemptDto>> GetUserLoginAttempts(GetLoginAttemptsInput input);
        Task<string> GetExternalLoginProviderNameByUser(long userId);
    }
}
