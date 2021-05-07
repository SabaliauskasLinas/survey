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
        IEnumerable<Survey> GetUserSurveys(int userId);
        IEnumerable<Survey> GetUserAnsweredSurveys(int userId);
        Survey GetSurveyById(int surveyId);
        Survey GetSurveyWithOptions(int surveyId);
        Survey GetSurveyWithAnswers(int surveyId);
        void CreateSurvey(Survey survey);
        void UpdateSurvey(Survey survey);
        void DeleteSurvey(Survey survey);
    }
}
