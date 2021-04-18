using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Configuration
{
    public class QuestionTypesConfiguration : IEntityTypeConfiguration<QuestionType>
    {
        public void Configure(EntityTypeBuilder<QuestionType> builder)
        {
            builder.HasData
            (
                new QuestionType
                {
                    Id = 1,
                    Name = "Short answer",
                },
                new QuestionType
                {
                    Id = 2,
                    Name = "Paragraph",
                },
                new QuestionType
                {
                    Id = 3,
                    Name = "Multiple choice",
                },
                new QuestionType
                {
                    Id = 4,
                    Name = "Checkboxes",
                },
                new QuestionType
                {
                    Id = 5,
                    Name = "Linear scale",
                }
            );
        }
    }
}
