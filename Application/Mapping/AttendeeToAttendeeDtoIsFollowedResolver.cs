using System.Linq;
using Application.Interfaces;
using Application.Resources;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Mapping
{
    public class AttendeeToAttendeeDtoIsFollowedResolver : IValueResolver<Attendee, AttendeeDto, bool>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public AttendeeToAttendeeDtoIsFollowedResolver(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public bool Resolve(Attendee attendee, AttendeeDto attendeeDto, bool isFollowed, ResolutionContext context)
        {
            var currentUser = _context.Users
                .Include(u => u.Followings)
                .SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUsername())
                .Result;

            if (currentUser.Followings.Any(f => f.FollowingId == attendee.AppUserId))
                return true;

            return false;
        }
    }
}