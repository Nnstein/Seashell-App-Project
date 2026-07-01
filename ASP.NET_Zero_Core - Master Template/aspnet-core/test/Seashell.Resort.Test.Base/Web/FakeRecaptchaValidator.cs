using System.Threading.Tasks;
using Seashell.Resort.Security.Recaptcha;

namespace Seashell.Resort.Test.Base.Web
{
    public class FakeRecaptchaValidator : IRecaptchaValidator
    {
        public Task ValidateAsync(string captchaResponse)
        {
            return Task.CompletedTask;
        }
    }
}
