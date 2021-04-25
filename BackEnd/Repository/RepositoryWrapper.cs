using Contracts;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private RepositoryContext _repoContext;
        private ISurveyRepository _survey;
        private ISubmissionRepository _submission;

        public ISurveyRepository Survey
        {
            get
            {
                if (_survey == null)
                {
                    _survey = new SurveyRepository(_repoContext);
                }
                return _survey;
            }
        }

        public ISubmissionRepository Submission
        {
            get
            {
                if (_submission == null)
                {
                    _submission = new SubmissionRepository(_repoContext);
                }
                return _submission;
            }
        }

        public RepositoryWrapper(RepositoryContext repositoryContext)
        {
            _repoContext = repositoryContext;
        }
        public void Save()
        {
            _repoContext.SaveChanges();
        }
    }
}
