using Microsoft.AspNetCore.Components;
using Seashell.Resort.Authorization.Accounts;
using Seashell.Resort.Authorization.Accounts.Dto;
using Seashell.Resort.Maui.Core;
using Seashell.Resort.Maui.Core.Components;
using Seashell.Resort.Maui.Core.Threading;
using Seashell.Resort.Maui.Models.Login;

namespace Seashell.Resort.Maui.Pages.Login
{
    public partial class ForgotPasswordModal : ModalBase
    {
        public override string ModalId => "forgot-password-modal";
       
        [Parameter] public EventCallback OnSave { get; set; }
        
        public ForgotPasswordModel ForgotPasswordModel { get; } = new();

        private readonly IAccountAppService _accountAppService;

        public ForgotPasswordModal()
        {
            _accountAppService = Resolve<IAccountAppService>();
        }

        protected virtual async Task Save()
        {
            await SetBusyAsync(async () =>
            {
                await WebRequestExecuter.Execute(
                async () =>
                    await _accountAppService.SendPasswordResetCode(new SendPasswordResetCodeInput { EmailAddress = ForgotPasswordModel.EmailAddress }),
                    async () =>
                    {
                        await OnSave.InvokeAsync();
                    }
                );
            });
        }

        protected virtual async Task Cancel()
        {
            await Hide();
        }
    }
}


