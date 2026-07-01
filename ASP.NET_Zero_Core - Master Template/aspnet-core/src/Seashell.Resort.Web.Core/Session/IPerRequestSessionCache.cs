using System.Threading.Tasks;
using Seashell.Resort.Sessions.Dto;

namespace Seashell.Resort.Web.Session
{
    public interface IPerRequestSessionCache
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformationsAsync();
    }
}
