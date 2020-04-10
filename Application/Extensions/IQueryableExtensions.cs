using System.Linq;
using Application.Interfaces;

namespace Application.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> query, IFilter filter)
        {
            if (filter.Offset < 0)
                filter.Offset = 0;

            if (filter.Limit <= 0)
                filter.Limit = 3;

            return query.Skip(filter.Offset).Take(filter.Limit);
        }
    }
}