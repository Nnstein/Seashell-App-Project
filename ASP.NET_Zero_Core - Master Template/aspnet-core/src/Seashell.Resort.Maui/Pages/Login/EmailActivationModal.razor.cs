using Microsoft.AspNetCore.Components;
using Seashell.Resort.Authorization.Accounts;
using Seashell.Resort.Authorization.Accounts.Dto;
using Seashell.Resort.Maui.Core;
using Seashell.Resort.Maui.Core.Components;
using Seashell.Resort.Maui.Core.Threading;
using Seashell.Resort.Maui.Models.Login;

namespace Seashell.Resort.Maui.Pages.Login
{
    public partial class EmailActivationModal : ModalBase
    {
        public override string ModalId => "email-activation-modal";

        [Parameter] public EventCallback OnSave { get; set; }

        public EmailActivationModel emailActivationModel { get; set; } = new EmailActivationModel();

        private readonly IAccountAppService _accountAppService;

        public EmailActivationModal()
        {
            _accountAppService = Resolve<IAccountAppService>();
        }

        protected virtual async Task Save()
        {
            await SetBusyAsync(async () =>
            {
                await WebRequestExecuter.Execute(
                async () =>
                    await _accountAppService.SendEmailActivationLink(new SendEmailActivationLinkInput
                    {
                        EmailAddress = emailActivationModel.EmailAddress
                    }),
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


