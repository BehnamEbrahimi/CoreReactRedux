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
    public class Details
    {
        public class Query : IRequest<ProfileDto>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, ProfileDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ProfileDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(u => u.Photos)
                    .Include(u => u.Followers)
                    .Include(u => u.Followings)
                    .SingleOrDefaultAsync(u => u.UserName == request.Username);

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not found" });

                return _mapper.Map<ProfileDto>(user);
            }
        }
    }
}