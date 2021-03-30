using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Contracts
{
    public interface ISurveyRepository
    {
        IEnumerable<Survey> GetMostPopularSurveys();
        IEnumerable<Survey> GetMostRecentSurveys();
        Survey GetSurveyById(int surveyId);
        Survey GetSurveyWithDetails(int surveyId);
        void CreateSurvey(Survey survey);
        void UpdateSurvey(Survey survey);
        void DeleteSurvey(Survey survey);
    }
}
