using System.Collections.Generic;
using System.Threading.Tasks;
using Abp;
using Seashell.Resort.Dto;

namespace Seashell.Resort.Gdpr
{
    public interface IUserCollectedDataProvider
    {
        Task<List<FileDto>> GetFiles(UserIdentifier user);
    }
}
