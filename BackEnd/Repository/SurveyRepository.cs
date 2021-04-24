using Contracts;
using Entities;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Repository
{
    class SurveyRepository : RepositoryBase<Survey>, ISurveyRepository
    {
        public SurveyRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public IEnumerable<Survey> GetMostPopularSurveys()
        {
            return FindAll()
                .Take(10)
                .OrderByDescending(o => o.TotalAnswers)
                .ToList();
        }

        public IEnumerable<Survey> GetMostRecentSurveys()
        {
            return FindAll()
                .Take(10)
                .OrderByDescending(o => o.CreatedAt)
                .ToList();
        }

        public Survey GetSurveyById(int surveyId)
        {
            return FindByCondition(s => s.Id.Equals(surveyId))
                .FirstOrDefault();
        }

        public Survey GetSurveyWithOptions(int surveyId)
        {
            return FindByCondition(s => s.Id.Equals(surveyId))
                .Include(q => q.Questions).ThenInclude(o => o.Options)
                .FirstOrDefault();
        }

        public Survey GetSurveyWithAnswers(int surveyId)
        {
            return FindByCondition(s => s.Id.Equals(surveyId))
                .Include(q => q.Questions).ThenInclude(o => o.Options)
                .Include(q => q.Questions).ThenInclude(o => o.Answers)
                .FirstOrDefault();
        }

        public void CreateSurvey(Survey survey) => Create(survey);

        public void UpdateSurvey(Survey survey) => Update(survey);

        public void DeleteSurvey(Survey survey) => Delete(survey);
    }
}
