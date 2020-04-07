using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsHostRequirementHandler(DataContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var activityId = Guid.Parse(_httpContextAccessor.HttpContext.Request.RouteValues
                                            .SingleOrDefault(v => v.Key == "id").Value.ToString());

            var activity = _context.Activities
                                    .Include(a => a.Attendees)
                                    .SingleOrDefaultAsync(a => a.Id == activityId)
                                    .Result; //because it is a task and we don't want to release the calling thread until the asynchronous operation is complete;  it is equivalent to calling the Wait method.

            var host = activity.Attendees.FirstOrDefault(at => at.IsHost);

            _context.Users.Where(u => u.Id == host.AppUserId).Load(); //Explicit loading

            if (host?.AppUser?.UserName == currentUserName)
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}