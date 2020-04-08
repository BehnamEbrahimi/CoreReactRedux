using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Application.Resources
{
    public class ActivityDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public ICollection<AttendeeDto> Attendees { get; set; }

        public ActivityDto()
        {
            Attendees = new Collection<AttendeeDto>();
        }
    }
}