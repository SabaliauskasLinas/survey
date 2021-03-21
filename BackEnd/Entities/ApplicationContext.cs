using Entities.Configuration;
using Microsoft.EntityFrameworkCore;
using System;

namespace Entities
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }
        public DbSet<Student> Students { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // indexes, composite keys, relationships are the things we should keep in the OnModelCreating method.
            modelBuilder.ApplyConfiguration(new StudentConfiguration());
            modelBuilder.ApplyConfiguration(new StudentSubjectConfiguration());
        }
    }
}
