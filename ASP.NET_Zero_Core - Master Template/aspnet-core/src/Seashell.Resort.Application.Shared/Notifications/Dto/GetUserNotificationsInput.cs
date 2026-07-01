using System;
using Abp.Notifications;
using Seashell.Resort.Dto;

namespace Seashell.Resort.Notifications.Dto
{
    public class GetUserNotificationsInput : PagedInputDto
    {
        public UserNotificationState? State { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }
    }
}