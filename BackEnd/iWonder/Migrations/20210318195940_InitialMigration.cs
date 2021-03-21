using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace iWonder.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Student",
                columns: table => new
                {
                    StudentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AnotherKeyProperty = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Age = table.Column<int>(type: "int", nullable: true),
                    IsRegularStudent = table.Column<bool>(type: "bit", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Student", x => new { x.StudentId, x.AnotherKeyProperty });
                });

            migrationBuilder.Sql(@"CREATE PROCEDURE MyCustomProcedure
                               AS
                               SELECT * FROM Student");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Student");

            migrationBuilder.Sql(@"DROP PROCEDURE MyCustomProcedure");
        }
    }
}
