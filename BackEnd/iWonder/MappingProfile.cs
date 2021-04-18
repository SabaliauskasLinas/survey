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
            CreateMap<OwnerForUpdateDto, Owner>();
            CreateMap<OwnerForCreationDto, Owner>();
            CreateMap<SurveyCreationDto, Survey>();
            CreateMap<QuestionCreationDto, Question>();
            CreateMap<QuestionOptionCreationDto, QuestionOption>();
            CreateMap<SubmissionCreationDto, Submission>();
            CreateMap<AnswerCreationDto, Answer>();
            CreateMap<Survey, SurveyDto>();
            CreateMap<Question, QuestionDto>();
            CreateMap<Submission, SubmissionDto>();
            CreateMap<Answer, AnswerDto>();
            CreateMap<QuestionOption, QuestionOptionDto>();
        }
    }
}
