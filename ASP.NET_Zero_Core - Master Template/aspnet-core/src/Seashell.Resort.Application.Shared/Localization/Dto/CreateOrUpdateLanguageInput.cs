using System.ComponentModel.DataAnnotations;

namespace Seashell.Resort.Localization.Dto
{
    public class CreateOrUpdateLanguageInput
    {
        [Required]
        public ApplicationLanguageEditDto Language { get; set; }
    }
}