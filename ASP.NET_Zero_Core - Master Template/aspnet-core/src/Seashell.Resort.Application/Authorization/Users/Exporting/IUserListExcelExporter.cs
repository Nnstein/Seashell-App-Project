using System.Collections.Generic;
using Seashell.Resort.Authorization.Users.Dto;
using Seashell.Resort.Dto;

namespace Seashell.Resort.Authorization.Users.Exporting
{
    public interface IUserListExcelExporter
    {
        FileDto ExportToFile(List<UserListDto> userListDtos, List<string> selectedColumns);
    }
}