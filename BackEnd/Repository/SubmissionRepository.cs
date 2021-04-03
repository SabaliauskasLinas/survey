using Contracts;
using Entities;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Repository
{
    class SubmissionRepository : RepositoryBase<Submission>, ISubmissionRepository
    {
        public SubmissionRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public Submission GetSubmissionById(int submissionId)
        {
            return FindByCondition(s => s.Id.Equals(submissionId))
                .FirstOrDefault();
        }

        public Submission GetSubmissionWithDetails(int submissionId)
        {
            return FindByCondition(s => s.Id.Equals(submissionId))
                .Include(q => q.Answers)
                .FirstOrDefault();
        }

        public void CreateSubmission(Submission submission) => Create(submission);

        public void CreateSubmissions(IEnumerable<Submission> submissions) => CreateMultiple(submissions);

        public void UpdateSubmission(Submission submission) => Update(submission);

        public void DeleteSubmission(Submission submission) => Delete(submission);
    }
}
