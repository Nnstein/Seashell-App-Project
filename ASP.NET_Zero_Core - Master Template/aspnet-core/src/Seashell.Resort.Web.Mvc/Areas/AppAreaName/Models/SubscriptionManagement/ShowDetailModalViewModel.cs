using Abp.AutoMapper;
using Seashell.Resort.MultiTenancy.Payments.Dto;

namespace Seashell.Resort.Web.Areas.AppAreaName.Models.SubscriptionManagement;

[AutoMapFrom(typeof(SubscriptionPaymentProductDto))]
public class ShowDetailModalViewModel : SubscriptionPaymentProductDto
{
}