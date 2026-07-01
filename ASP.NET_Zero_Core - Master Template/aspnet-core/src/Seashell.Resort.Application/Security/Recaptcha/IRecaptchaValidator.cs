using System.Threading.Tasks;

namespace Seashell.Resort.Security.Recaptcha
{
    public interface IRecaptchaValidator
    {
        Task ValidateAsync(string captchaResponse);
    }
}