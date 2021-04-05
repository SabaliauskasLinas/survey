using AutoMapper;
using Contracts;
using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;

namespace iWonder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubmissionController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private IMapper _mapper;

        public SubmissionController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "SubmissionById")]
        public IActionResult GetSubmissionById(int id)
        {
            var submission = _repository.Submission.GetSubmissionWithDetails(id);
            if (submission == null)
            {
                _logger.LogError($"Submission with id: {id}, hasn't been found.");
                return NotFound();
            }
            else
            {
                _logger.LogInfo($"Returned Submission with id: {id}");
                var submissionResult = _mapper.Map<SubmissionDto>(submission);
                return Ok(submissionResult);
            }
        }

        [HttpPost]
        public IActionResult CreateSubmission([FromBody] SubmissionCreationDto submission)
        {
            if (submission == null)
            {
                _logger.LogError("Submission object sent from client is null.");
                return BadRequest("Submission object is null");
            }
            if (!ModelState.IsValid)
            {
                _logger.LogError("Invalid Submission object sent from client.");
                return BadRequest("Invalid model object");
            }
            var submissionEntity = _mapper.Map<Submission>(submission);
            _repository.Submission.CreateSubmission(submissionEntity);

            var survey = _repository.Survey.GetSurveyById(submission.SurveyId);
            survey.TotalAnswers++;
            _repository.Survey.UpdateSurvey(survey);

            _repository.Save();

            var createdSubmission = _mapper.Map<SubmissionDto>(submissionEntity);
            return CreatedAtRoute("SubmissionById", new { id = createdSubmission.Id }, createdSubmission);
        }
    }
}
