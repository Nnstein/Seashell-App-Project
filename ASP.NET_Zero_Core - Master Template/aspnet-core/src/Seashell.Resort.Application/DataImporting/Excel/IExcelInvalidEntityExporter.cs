using System.Collections.Generic;
using Abp.Dependency;
using Seashell.Resort.Dto;

namespace Seashell.Resort.DataImporting.Excel;

public interface IExcelInvalidEntityExporter<TEntityDto> : ITransientDependency
{
    FileDto ExportToFile(List<TEntityDto> entities);
}