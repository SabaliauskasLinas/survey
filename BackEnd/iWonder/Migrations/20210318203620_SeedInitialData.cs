using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace iWonder.Migrations
{
    public partial class SeedInitialData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Student",
                table: "Student");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Student",
                table: "Student",
                column: "StudentId");

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "StudentId", "Age", "AnotherKeyProperty", "Name" },
                values: new object[] { new Guid("32428fbb-d7af-4115-8242-362a03a9933a"), 30, new Guid("00000000-0000-0000-0000-000000000000"), "John Doe" });

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "StudentId", "Age", "AnotherKeyProperty", "Name" },
                values: new object[] { new Guid("f9610e26-003e-44eb-8945-25d60a7ab036"), 25, new Guid("00000000-0000-0000-0000-000000000000"), "Jane Doe" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Student",
                table: "Student");

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("32428fbb-d7af-4115-8242-362a03a9933a"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("f9610e26-003e-44eb-8945-25d60a7ab036"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Student",
                table: "Student",
                columns: new[] { "StudentId", "AnotherKeyProperty" });
        }
    }
}
