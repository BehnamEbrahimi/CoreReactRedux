using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Types;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoStorage _photoStorage;

            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoStorage photoStorage)
            {
                _context = context;
                _userAccessor = userAccessor;
                _photoStorage = photoStorage;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                                    .Include(u => u.Photos)
                                    .SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUsername());

                var photo = user.Photos.FirstOrDefault(p => p.Id == request.Id);

                if (photo == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Photo = "Not found" });

                if (photo.IsMain)
                    throw new RestException(HttpStatusCode.BadRequest, new { Photo = "You cannot delete your main photo" });

                var result = _photoStorage.DeletePhoto(photo.Id);

                if (result == null)
                    throw new Exception("Problem deleting photo");

                user.Photos.Remove(photo);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}