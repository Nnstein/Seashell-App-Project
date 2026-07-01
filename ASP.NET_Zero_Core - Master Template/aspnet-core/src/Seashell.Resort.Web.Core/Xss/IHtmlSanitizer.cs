using Abp.Dependency;

namespace Seashell.Resort.Web.Xss
{
    public interface IHtmlSanitizer: ITransientDependency
    {
        string Sanitize(string html);
    }
}