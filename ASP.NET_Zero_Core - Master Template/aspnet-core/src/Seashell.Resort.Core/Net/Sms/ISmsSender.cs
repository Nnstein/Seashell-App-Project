using System.Threading.Tasks;

namespace Seashell.Resort.Net.Sms
{
    public interface ISmsSender
    {
        Task SendAsync(string number, string message);
    }
}