using Abp;
using System.Threading.Tasks;

namespace Seashell.Resort.Authorization.Users.DataCleaners
{
    public interface IUserDataCleaner
    {
        Task CleanUserData(UserIdentifier userIdentifier);
    }
}
