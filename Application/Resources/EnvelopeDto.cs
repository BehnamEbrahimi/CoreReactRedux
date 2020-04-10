using System.Collections.Generic;

namespace Application.Resources
{
    public class EnvelopeDto<T>
    {
        public int TotalItems { get; set; }
        public IEnumerable<T> Items { get; set; }
    }
}