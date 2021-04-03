using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Configuration
{
    public class AnswersConfiguration : IEntityTypeConfiguration<Answer>
    {
        public void Configure(EntityTypeBuilder<Answer> builder)
        {
            builder
                .HasOne(e => e.Submission)
                .WithMany(e => e.Answers)
                .HasForeignKey(d => d.SubmissionId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
