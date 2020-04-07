using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<Attendee, AttendeeDto>()
                .ForMember(ad => ad.Username, opt => opt.MapFrom(a => a.AppUser.UserName))
                .ForMember(ad => ad.DisplayName, opt => opt.MapFrom(a => a.AppUser.DisplayName));
        }
    }
}