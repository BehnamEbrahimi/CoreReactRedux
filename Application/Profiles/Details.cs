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
                                    .SingleOrDefaultAsync(u => u.UserName == request.Username);

                return new ProfileDto
                {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    Image = user.Photos.FirstOrDefault(p => p.IsMain)?.Url,
                    Photos = _mapper.Map<ICollection<Photo>, ICollection<PhotoDto>>(user.Photos),
                    Bio = user.Bio
                };
            }
        }
    }
}