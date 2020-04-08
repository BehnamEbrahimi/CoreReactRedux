using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Types;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Unattend
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Activity = "Cound not find activity" });

                var user = await _context.Users.SingleOrDefaultAsync(u =>
                    u.UserName == _userAccessor.GetCurrentUsername());

                var attendee = await _context.Attendees
                    .SingleOrDefaultAsync(at => at.ActivityId == activity.Id &&
                        at.AppUserId == user.Id);

                if (attendee == null)
                    return Unit.Value;

                if (attendee.IsHost)
                    throw new RestException(HttpStatusCode.BadRequest, new { attendee = "You cannot remove yourself as host" });

                _context.Attendees.Remove(attendee);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}