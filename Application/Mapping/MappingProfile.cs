using System.Linq;
using Application.Resources;
using AutoMapper;
using Domain;

namespace Application.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<Attendee, AttendeeDto>()
                .ForMember(ad => ad.Username, opt => opt.MapFrom(a => a.AppUser.UserName))
                .ForMember(ad => ad.DisplayName, opt => opt.MapFrom(a => a.AppUser.DisplayName))
                .ForMember(ad => ad.Image, opt => opt.MapFrom(a => a.AppUser.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(ad => ad.IsFollowed, opt => opt.MapFrom<AttendeeToAttendeeDtoIsFollowedResolver>());
            CreateMap<Comment, CommentDto>()
                .ForMember(cd => cd.Username, opt => opt.MapFrom(c => c.Author.UserName))
                .ForMember(cd => cd.DisplayName, opt => opt.MapFrom(c => c.Author.DisplayName))
                .ForMember(cd => cd.Image, opt => opt.MapFrom(c => c.Author.Photos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<AppUser, ProfileDto>()
                .ForMember(p => p.Image, opt => opt.MapFrom(u => u.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(p => p.FollowersCount, opt => opt.MapFrom(u => u.Followers.Count()))
                .ForMember(p => p.FollowingsCount, opt => opt.MapFrom(u => u.Followings.Count()))
                .ForMember(p => p.IsFollowed, opt => opt.MapFrom<AppUserToProfileDtoIsFollowedResolver>());
            CreateMap<Photo, PhotoDto>();
        }
    }
}