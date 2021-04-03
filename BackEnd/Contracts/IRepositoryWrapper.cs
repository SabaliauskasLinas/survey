﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Contracts
{
    public interface IRepositoryWrapper
    {
        IOwnerRepository Owner { get; }
        IAccountRepository Account { get; }
        ISurveyRepository Survey { get; }
        ISubmissionRepository Submission { get; }
        void Save();
    }
}
