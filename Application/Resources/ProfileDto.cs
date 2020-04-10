using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Application.Resources
{
    public class ProfileDto
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public string Bio { get; set; }
        public bool IsFollowed { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingsCount { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
        public ProfileDto()
        {
            Photos = new Collection<PhotoDto>();
        }
    }
}