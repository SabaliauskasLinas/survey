using Contracts;
using Entities;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Repository
{
    class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public User GetUserByEmail(string email) => FindByCondition(s => s.Email.Equals(email)).FirstOrDefault();

        public void CreateUser(User user) => Create(user);

        public void UpdateUser(User user) => Update(user);

        public void DeleteUser(User user) => Delete(user);
    }
}
