using System.Linq;
using Application.Interfaces;
using Application.Resources;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Mapping
{
    public class AppUserToProfileDtoIsFollowedResolver : IValueResolver<AppUser, ProfileDto, bool>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public AppUserToProfileDtoIsFollowedResolver(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public bool Resolve(AppUser user, ProfileDto profile, bool isFollowed, ResolutionContext context)
        {
            var currentUser = _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUsername()).Result;

            if (currentUser.Followings.Any(f => f.FollowingId == user.Id))
                return true;

            return false;
        }
    }
}