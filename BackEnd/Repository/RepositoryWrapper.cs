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
        private IOwnerRepository _owner;
        private IAccountRepository _account;
        private ISurveyRepository _survey;
        private ISubmissionRepository _submission;

        public IOwnerRepository Owner
        {
            get
            {
                if (_owner == null)
                {
                    _owner = new OwnerRepository(_repoContext);
                }
                return _owner;
            }
        }

        public IAccountRepository Account
        {
            get
            {
                if (_account == null)
                {
                    _account = new AccountRepository(_repoContext);
                }
                return _account;
            }
        }

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
