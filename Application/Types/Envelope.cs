using System.Collections.Generic;

public class Envelope<T>
{
    public int TotalItems { get; set; }
    public IEnumerable<T> Items { get; set; }
}