using Entities.Configuration;
using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Entities
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions options)
            : base(options)
        { 
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Survey> Surveys { get; set; }
        public DbSet<QuestionType> QuestionTypes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Submission> Submissions { get; set; }
        public DbSet<QuestionOption> QuestionOptions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // indexes, composite keys, relationships are the things we should keep in the OnModelCreating method.
            modelBuilder.ApplyConfiguration(new UsersConfiguration());
            modelBuilder.ApplyConfiguration(new QuestionTypesConfiguration());
            modelBuilder.ApplyConfiguration(new SurveysConfiguration());
            modelBuilder.ApplyConfiguration(new SubmissionsConfiguration());
            modelBuilder.ApplyConfiguration(new AnswersConfiguration());
        }
    }
}
