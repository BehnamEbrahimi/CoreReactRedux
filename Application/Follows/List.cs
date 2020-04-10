using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Resources;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Follows
{
    public class List
    {
        public class Query : IRequest<List<ProfileDto>>
        {
            public string Username { get; set; }
            public string ListOf { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<ProfileDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<ProfileDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var follows = new List<Follow>();
                var profiles = new List<AppUser>();

                switch (request.ListOf)
                {
                    case "followers":
                        {
                            follows = await _context.Follows
                                .Where(f => f.Following.UserName == request.Username)
                                .ToListAsync();

                            var followerIds = follows.Select(f => f.FollowerId);

                            var followers = await _context.Users
                                    .Include(u => u.Photos)
                                    .Include(u => u.Followers)
                                    .Include(u => u.Followings)
                                    .Where(u => followerIds.Contains(u.Id))
                                    .ToListAsync();

                            profiles.AddRange(followers);

                            break;
                        }

                    case "followings":
                        {
                            follows = await _context.Follows
                                .Where(f => f.Follower.UserName == request.Username)
                                .ToListAsync();

                            var followingIds = follows.Select(f => f.FollowingId);

                            var followings = await _context.Users
                                    .Include(u => u.Photos)
                                    .Include(u => u.Followers)
                                    .Include(u => u.Followings)
                                    .Where(u => followingIds.Contains(u.Id))
                                    .ToListAsync();

                            profiles.AddRange(followings);

                            break;
                        }
                }

                return _mapper.Map<List<ProfileDto>>(profiles);
            }
        }
    }
}