namespace Application.Interfaces
{
    public interface IFilter
    {
        int Limit { get; set; }
        int Offset { get; set; }
    }
}