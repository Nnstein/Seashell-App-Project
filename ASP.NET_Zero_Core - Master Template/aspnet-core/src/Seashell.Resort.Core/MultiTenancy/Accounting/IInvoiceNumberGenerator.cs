using System.Threading.Tasks;
using Abp.Dependency;

namespace Seashell.Resort.MultiTenancy.Accounting
{
    public interface IInvoiceNumberGenerator : ITransientDependency
    {
        Task<string> GetNewInvoiceNumber();
    }
}