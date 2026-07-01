using Abp.EntityHistory;
using Seashell.Resort.Authorization.Users;
using System.Collections.Generic;

namespace Seashell.Resort.EntityChanges
{
    public class EntityChangePropertyAndUser
    {
        public EntityChange EntityChange { get; set; }
        public List<EntityPropertyChange> PropertyChanges { get; set; }
        public User User { get; set; }
    }
}
