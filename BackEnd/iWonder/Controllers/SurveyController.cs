using AutoMapper;
using Contracts;
using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        [HttpGet("{id}", Name = "SurveyById")]
        public IActionResult GetSurveyById(int id)
        {
            var survey = _repository.Survey.GetSurveyWithDetails(id);
            if (survey == null)
            {
                _logger.LogError($"Survey with id: {id}, hasn't been found in db.");
                return NotFound();
            }
            else
            {
                _logger.LogInfo($"Returned Survey with id: {id}");
                var surveyResult = _mapper.Map<SurveyDto>(survey);
                return Ok(surveyResult);
            }
        }

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
