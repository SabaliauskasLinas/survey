using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iWonder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public ValuesController(ApplicationContext context)
        {
            _context = context;
        }

        //[HttpGet]
        //public IActionResult Get()
        //{
        //    var entity = _context.Model
        //        .FindEntityType(typeof(Student).FullName);
        //    var tableName = entity.GetTableName();
        //    var schemaName = entity.GetSchema();
        //    var key = entity.FindPrimaryKey();
        //    var properties = entity.GetProperties();
        //}

        [HttpGet]
        public IActionResult Get()
        {
            //var students = _context.Students
            //       .AsNoTracking() //For readonly queries. will speed up the query execution
            //       .Where(s => s.Age > 25)
            //       .ToList();

            //var students = _context.Students
            //    .Include(e => e.Evaluations)
            //    .Include(ss => ss.StudentSubjects)
            //    .ThenInclude(s => s.Subject)
            //    .FirstOrDefault();

            //var student = _context.Students.FirstOrDefault();
            //_context.Entry(student)
            //    .Collection(e => e.Evaluations)
            //    .Load();
            //_context.Entry(student)
            //    .Collection(ss => ss.StudentSubjects)
            //    .Load();
            //foreach (var studentSubject in student.StudentSubjects)
            //{
            //    _context.Entry(studentSubject)
            //        .Reference(s => s.Subject)
            //        .Load();
            //}

            //var student = _context.Students.FirstOrDefault();
            //var evaluationsCount = _context.Entry(student)
            //    .Collection(e => e.Evaluations)
            //    .Query()
            //    .Count();
            //var gradesPerStudent = _context.Entry(student)
            //    .Collection(e => e.Evaluations)
            //    .Query()
            //    .Select(e => e.Grade)
            //    .ToList();

            var student = _context.Students
                .FromSqlRaw(@"SELECT * FROM Student WHERE Name = {0}", "John Doe") // do not use $"", because it loses sql injection attack detections
                .FirstOrDefault();

            return Ok(student);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Student student)
        {
            if (student == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest();

            student.StudentDetails = new StudentDetails
            {
                Address = "Added Address",
                AdditionalInformation = "Additional information added"
            };

            _context.Add(student);
            _context.SaveChanges();
            return Created("URI of the created entity", student);
        }

        [HttpPost("postrange")]
        public IActionResult PostRange([FromBody] IEnumerable<Student> students)
        {
            //additional checks
            _context.AddRange(students);
            _context.SaveChanges();
            return Created("URI is going here", students);
        }

        [HttpPut("{id}")]
        public IActionResult PUT(Guid id, [FromBody] Student student)
        {
            var dbStudent = _context.Students
                .FirstOrDefault(s => s.Id.Equals(id));
            dbStudent.Age = student.Age;
            dbStudent.Name = student.Name;
            dbStudent.IsRegularStudent = student.IsRegularStudent;

            var isAgeModified = _context.Entry(dbStudent).Property("Age").IsModified;
            var isNameModified = _context.Entry(dbStudent).Property("Name").IsModified;
            var isIsRegularStudentModified = _context.Entry(dbStudent).Property("IsRegularStudent").IsModified;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPut("{id}/relationship")]
        public IActionResult UpdateRelationship(Guid id, [FromBody] Student student)
        {
            var dbStudent = _context.Students
                .Include(s => s.StudentDetails)
                .FirstOrDefault(s => s.Id.Equals(id));
            dbStudent.Age = student.Age;
            dbStudent.Name = student.Name;
            dbStudent.IsRegularStudent = student.IsRegularStudent;
            dbStudent.StudentDetails.AdditionalInformation = "Additional information updated";
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPut("disconnected")]
        public IActionResult UpdateDisconnected([FromBody] Student student)
        {
            _context.Students.Attach(student);
            _context.Entry(student).State = EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPut("disconnected2")]
        public IActionResult UpdateDisconnected2([FromBody] Student student)
        {
            _context.Update(student);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult SoftDelete(Guid id)
        {
            var student = _context.Students
                .FirstOrDefault(s => s.Id.Equals(id));
            if (student == null)
                return BadRequest();
            student.Deleted = true;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var student = _context.Students
                .FirstOrDefault(s => s.Id.Equals(id));
            if (student == null)
                return BadRequest();
            _context.Remove(student);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}/relationship")]
        public IActionResult DeleteRelationships(Guid id)
        {
            var student = _context.Students
                .Include(s => s.StudentDetails)
                .FirstOrDefault(s => s.Id.Equals(id));
            if (student == null)
                return BadRequest();
            _context.Remove(student);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
