using AutoMapper;
using Entities.DTO;
using Entities.Models;

namespace iWonder
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Owner, OwnerDto>();
            CreateMap<Account, AccountDto>();
            CreateMap<OwnerForCreationDto, Owner>();
            CreateMap<OwnerForUpdateDto, Owner>();
        }
    }
}
