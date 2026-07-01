using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Seashell.Resort.MultiTenancy.Accounting.Dto;

namespace Seashell.Resort.MultiTenancy.Accounting
{
    public interface IInvoiceAppService
    {
        Task<InvoiceDto> GetInvoiceInfo(EntityDto<long> input);

        Task CreateInvoice(CreateInvoiceDto input);
    }
}
