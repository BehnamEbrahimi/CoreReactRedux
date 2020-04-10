using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Types;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Follows
{
    public class Add
    {
        public class Command : IRequest
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var follower = await _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUsername());

                var following = await _context.Users.SingleOrDefaultAsync(u => u.UserName == request.Username);

                if (following == null)
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not found" });

                var follow = await _context.Follows.SingleOrDefaultAsync(f => f.FollowerId == follower.Id && f.FollowingId == following.Id);

                if (follow != null)
                    throw new RestException(HttpStatusCode.BadRequest, new { User = "You are already following this user" });

                if (follow == null)
                {
                    follow = new Follow
                    {
                        Follower = follower,
                        Following = following
                    };

                    _context.Follows.Add(follow);
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}