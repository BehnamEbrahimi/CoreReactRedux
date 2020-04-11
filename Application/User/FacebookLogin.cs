using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Resources;
using Application.Types;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class FacebookLogin
    {
        public class Query : IRequest<UserDto>
        {
            public string AccessToken { get; set; }
        }

        public class Handler : IRequestHandler<Query, UserDto>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IFacebookAccessor _facebookAccessor;

            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, IFacebookAccessor facebookAccessor)
            {
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
                _facebookAccessor = facebookAccessor;
            }

            public async Task<UserDto> Handle(Query request, CancellationToken cancellationToken)
            {
                // get user info and verify token is valid
                var userInfo = await _facebookAccessor.FacebookLogin(request.AccessToken);

                // if user info is null then token could not be validated
                if (userInfo == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { User = "Problem validating token" });
                }

                var user = await _userManager.FindByEmailAsync(userInfo.Email);

                if (user == null)
                {
                    user = new AppUser
                    {
                        DisplayName = userInfo.Name,
                        Id = userInfo.Id,
                        Email = userInfo.Email,
                        UserName = "fb_" + userInfo.Id
                    };

                    var photo = new Photo
                    {
                        Id = "fb_" + userInfo.Id,
                        Url = userInfo.Picture.Data.Url,
                        IsMain = true
                    };

                    user.Photos.Add(photo);

                    var result = await _userManager.CreateAsync(user);

                    if (!result.Succeeded) throw new RestException(HttpStatusCode.BadRequest, new { User = "Problem adding user" });
                }

                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Token = _jwtGenerator.CreateToken(user),
                    Username = user.UserName,
                    Image = user.Photos.FirstOrDefault(p => p.IsMain)?.Url
                };
            }
        }
    }
}