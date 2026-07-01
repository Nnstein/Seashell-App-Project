using System.Collections.Generic;

namespace Seashell.Resort.Authorization.Users.Profile.Dto
{
    public class UpdateGoogleAuthenticatorKeyInput
    {
        public string GoogleAuthenticatorKey { get; set; }
        public string AuthenticatorCode { get; set; }
    }
}
