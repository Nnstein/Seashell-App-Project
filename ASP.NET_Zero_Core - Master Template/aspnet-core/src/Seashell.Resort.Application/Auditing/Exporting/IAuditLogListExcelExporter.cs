using Seashell.Resort.Auditing.Dto;
using Seashell.Resort.Dto;
using Seashell.Resort.EntityChanges.Dto;
using System.Collections.Generic;

namespace Seashell.Resort.Auditing.Exporting
{
    public interface IAuditLogListExcelExporter
    {
        FileDto ExportToFile(List<AuditLogListDto> auditLogListDtos);

        FileDto ExportToFile(List<EntityChangeListDto> entityChangeListDtos);
    }
}
