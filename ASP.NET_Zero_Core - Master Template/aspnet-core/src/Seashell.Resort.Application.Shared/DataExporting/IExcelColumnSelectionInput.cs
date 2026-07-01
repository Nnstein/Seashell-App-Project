using System.Collections.Generic;

namespace Seashell.Resort.DataExporting
{
    public interface IExcelColumnSelectionInput
    {
        List<string> SelectedColumns { get; set; }
    }
}