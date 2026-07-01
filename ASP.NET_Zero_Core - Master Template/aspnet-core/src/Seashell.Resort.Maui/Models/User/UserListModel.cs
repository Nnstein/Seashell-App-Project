using Abp.AutoMapper;
using Seashell.Resort.Authorization.Users.Dto;

namespace Seashell.Resort.Maui.Models.User
{
    [AutoMapFrom(typeof(UserListDto))]
    public class UserListModel : UserListDto
    {
        public string Photo { get; set; }

        public string FullName => Name + " " + Surname;
    }
}


