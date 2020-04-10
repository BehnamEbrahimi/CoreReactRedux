using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Resources;
using Application.Types;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query : IRequest<List<UserActivityDto>>
        {
            public string Username { get; set; }
            public string Filter { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<UserActivityDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<UserActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .SingleOrDefaultAsync(u => u.UserName == request.Username);

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not found" });

                var query = _context.Attendees
                    .Include(at => at.Activity)
                    .Where(at => at.AppUserId == user.Id)
                    .OrderBy(at => at.Activity.Date)
                    .AsQueryable();

                switch (request.Filter)
                {
                    case "past":
                        query = query.Where(at => at.Activity.Date <= DateTime.Now);
                        break;
                    case "hosting":
                        query = query.Where(at => at.IsHost);
                        break;
                    default:
                        query = query.Where(at => at.Activity.Date >= DateTime.Now);
                        break;
                }

                var attendees = await query.ToListAsync();

                var activitiesToReturn = new List<UserActivityDto>();
                foreach (var attendee in attendees)
                {
                    activitiesToReturn.Add(_mapper.Map<UserActivityDto>(attendee.Activity));
                }

                return activitiesToReturn;
            }
        }
    }
}