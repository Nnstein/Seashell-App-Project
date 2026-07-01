using System.Collections.Generic;

namespace Seashell.Resort.EntityChanges.Dto
{
    public class EntityAndPropertyChangeListDto
    {
        public EntityChangeListDto EntityChange { get; set; }
        public List<EntityPropertyChangeDto> EntityPropertyChanges { get; set; }
    }
}
