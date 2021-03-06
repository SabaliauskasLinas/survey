using AutoMapper;
using Contracts;
using Entities.DTO;
using Entities.Models;
using iWonder.Helpers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace iWonder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private IMapper _mapper;

        public SurveyController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("GetSurveyWithOptions/{id}", Name = "SurveyById")]
        public IActionResult GetSurveyById(int id)
        {
            var survey = _repository.Survey.GetSurveyWithOptions(id);
            if (survey == null)
            {
                _logger.LogError($"Survey with id: {id}, hasn't been found.");
                return NotFound();
            }
            else
            {
                _logger.LogInfo($"Returned Survey with id: {id}");
                var surveyResult = _mapper.Map<SurveyDto>(survey);
                return Ok(surveyResult);
            }
        }

        [Authorize]
        [HttpGet("GetSurveyWithAnswers/{id}")]
        public IActionResult GetSurveyWithAnswers(int id)
        {
            var survey = _repository.Survey.GetSurveyWithAnswers(id);
            if (survey == null)
            {
                _logger.LogError($"Survey with id: {id}, hasn't been found.");
                return NotFound();
            }
            else
            {
                _logger.LogInfo($"Returned Survey with id: {id}");
                var surveyResult = _mapper.Map<SurveyDto>(survey);
                return Ok(surveyResult);
            }
        }

        [HttpGet("GetMostPopularSurveys")]
        public IActionResult GetMostPopularSurveys()
        {
            var surveys = _repository.Survey.GetMostPopularSurveys();
            _logger.LogInfo("Returned all most popular surveys.");
            var surveysResult = _mapper.Map<IEnumerable<SurveyDto>>(surveys);
            return Ok(surveysResult);
        }

        [HttpGet("GetMostRecentSurveys")]
        public IActionResult GetMostRecentSurveys()
        {
            var surveys = _repository.Survey.GetMostRecentSurveys();
            _logger.LogInfo("Returned all most recent surveys.");
            var surveysResult = _mapper.Map<IEnumerable<SurveyDto>>(surveys);
            return Ok(surveysResult);
        }

        [HttpGet("GetUserSurveys/{userId}")]
        public IActionResult GetUserSurveys(int userId)
        {
            var surveys = _repository.Survey.GetUserSurveys(userId);
            _logger.LogInfo("Returned all most recent surveys.");
            var surveysResult = _mapper.Map<IEnumerable<SurveyDto>>(surveys);
            return Ok(surveysResult);
        }

        [HttpGet("GetUserAnsweredSurveys/{userId}")]
        public IActionResult GetUserAnsweredSurveys(int userId)
        {
            var surveys = _repository.Survey.GetUserAnsweredSurveys(userId);
            _logger.LogInfo("Returned all most recent surveys.");
            var surveysResult = _mapper.Map<IEnumerable<SurveyDto>>(surveys);
            return Ok(surveysResult);
        }

        [Authorize]
        [HttpPost]
        public IActionResult CreateSurvey([FromBody] SurveyCreationDto survey)
        {
            if (survey == null)
            {
                _logger.LogError("Survey object sent from client is null.");
                return BadRequest("Survey object is null");
            }
            if (!ModelState.IsValid)
            {
                _logger.LogError("Invalid Survey object sent from client.");
                return BadRequest("Invalid model object");
            }
            var surveyEntity = _mapper.Map<Survey>(survey);
            _repository.Survey.CreateSurvey(surveyEntity);
            _repository.Save();

            var createdSurvey = _mapper.Map<SurveyDto>(surveyEntity);
            return CreatedAtRoute("SurveyById", new { id = createdSurvey.Id }, createdSurvey);
        }
    }
}
