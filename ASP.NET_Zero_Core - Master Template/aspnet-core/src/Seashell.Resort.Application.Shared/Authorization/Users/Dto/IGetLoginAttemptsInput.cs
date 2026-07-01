using Abp.Application.Services.Dto;

namespace Seashell.Resort.Authorization.Users.Dto
{
    public interface IGetLoginAttemptsInput: ISortedResultRequest
    {
        string Filter { get; set; }
    }
}