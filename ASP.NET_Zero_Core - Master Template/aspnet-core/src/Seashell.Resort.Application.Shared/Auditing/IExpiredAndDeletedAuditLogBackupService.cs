using System.Collections.Generic;
using Abp.Auditing;

namespace Seashell.Resort.Auditing
{
    public interface IExpiredAndDeletedAuditLogBackupService
    {
        bool CanBackup();
        
        void Backup(List<AuditLog> auditLogs);
    }
}