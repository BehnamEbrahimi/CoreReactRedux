using System.Collections.Generic;
using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public ICollection<Attendee> Attendees { get; set; }
        public ICollection<Photo> Photos { get; set; }

        public AppUser()
        {
            Attendees = new Collection<Attendee>();
            Photos = new Collection<Photo>();
        }
    }
}