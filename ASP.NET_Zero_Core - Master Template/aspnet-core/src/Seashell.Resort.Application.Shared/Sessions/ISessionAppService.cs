using System.Threading.Tasks;
using Abp.Application.Services;
using Seashell.Resort.Sessions.Dto;

namespace Seashell.Resort.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();

        Task<UpdateUserSignInTokenOutput> UpdateUserSignInToken();
    }
}
