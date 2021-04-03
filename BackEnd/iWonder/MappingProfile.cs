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
            CreateMap<SurveyCreationDto, Survey>();
            CreateMap<QuestionCreationDto, Question>();
            CreateMap<Survey, SurveyDto>();
            CreateMap<Question, QuestionDto>();
            CreateMap<AnswerCreationDto, Answer>();
            CreateMap<SubmissionCreationDto, Submission>();
            CreateMap<Submission, SubmissionDto>();
            CreateMap<Answer, AnswerDto>();
        }
    }
}
