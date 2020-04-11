using System.Threading.Tasks;
using Application.Types;

namespace Application.Interfaces
{
    public interface IFacebookAccessor
    {
        Task<FacebookUserInfo> FacebookLogin(string fbAccessToken);
    }
}