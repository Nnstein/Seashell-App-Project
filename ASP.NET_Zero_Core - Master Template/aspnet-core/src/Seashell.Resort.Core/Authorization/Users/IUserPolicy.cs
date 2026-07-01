using System.Threading.Tasks;
using Abp.Domain.Policies;

namespace Seashell.Resort.Authorization.Users
{
    public interface IUserPolicy : IPolicy
    {
        Task CheckMaxUserCountAsync(int tenantId);
    }
}
