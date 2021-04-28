using System;
using System.Collections.Generic;
using System.Text;

namespace Contracts
{
    public interface IRepositoryWrapper
    {
        ISurveyRepository Survey { get; }
        ISubmissionRepository Submission { get; }
        IUserRepository User { get; }
        void Save();
    }
}
