using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Extensions;
using Application.Interfaces;
using Application.Resources;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<EnvelopeDto<ActivityDto>>, IFilter
        {
            public int Limit { get; set; }
            public int Offset { get; set; }
            public bool? IsGoing { get; set; }
            public bool? IsHost { get; set; }
            public DateTime? StartDate { get; set; }
        }

        public class Handler : IRequestHandler<Query, EnvelopeDto<ActivityDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<EnvelopeDto<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = new Envelope<Activity>();

                var query = _context.Activities
                    .Include(a => a.Attendees)
                        .ThenInclude(at => at.AppUser)
                            .ThenInclude(u => u.Photos)
                    .Include(a => a.Comments)
                    .Where(a => a.Date >= request.StartDate)
                    .OrderBy(a => a.Date)
                    .AsQueryable();

                if (request.IsGoing.GetValueOrDefault() && !request.IsHost.GetValueOrDefault())
                {
                    query = query.Where(a => a.Attendees.Any(at => at.AppUser.UserName == _userAccessor.GetCurrentUsername()));
                }

                if (request.IsHost.GetValueOrDefault() && !request.IsGoing.GetValueOrDefault())
                {
                    query = query.Where(a => a.Attendees.Any(at => at.AppUser.UserName == _userAccessor.GetCurrentUsername() && at.IsHost));
                }

                result.TotalItems = await query.CountAsync();

                query = query.ApplyPaging(request);

                var activities = await query.ToListAsync();

                result.Items = activities;

                return _mapper.Map<Envelope<Activity>, EnvelopeDto<ActivityDto>>(result);
            }
        }
    }
}