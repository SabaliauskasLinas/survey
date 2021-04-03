using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Contracts
{
    public interface ISubmissionRepository
    {
        Submission GetSubmissionById(int submissionId);
        Submission GetSubmissionWithDetails(int submissionId);
        void CreateSubmission(Submission submission);
        void CreateSubmissions(IEnumerable<Submission> submissions);
        void UpdateSubmission(Submission submission);
        void DeleteSubmission(Submission submission);
    }
}
