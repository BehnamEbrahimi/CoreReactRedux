using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public ICollection<Attendee> Attendees { get; set; }

        public Activity()
        {
            Attendees = new Collection<Attendee>();
        }
    }
}