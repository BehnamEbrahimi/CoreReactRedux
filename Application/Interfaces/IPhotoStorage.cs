using Application.Types;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IPhotoStorage
    {
        PhotoUploadResult AddPhoto(IFormFile file);
        string DeletePhoto(string publidId);

    }
}