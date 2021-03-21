using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace iWonder.Migrations
{
    public partial class AddedDeletedPropertyToStudent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("41979a5e-3309-4cd6-bdec-a9741ad55f9f"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("514bc322-3c3c-4349-ae65-7235e931d21f"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("79e98ded-86ce-440b-ac00-c3dd970b76df"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("88f241e2-f6d0-4d19-9e16-04c4e109afa7"));

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "Student",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "StudentId", "Age", "Deleted", "Name" },
                values: new object[,]
                {
                    { new Guid("5d37153c-2dff-4b79-a2f5-c2404d676667"), 30, false, "John Doe" },
                    { new Guid("a9c164ae-8492-4719-bb85-01e3b8c5c08d"), 25, false, "Jane Doe" },
                    { new Guid("2a24be71-c812-4509-a239-3c0673feb1bf"), 28, false, "Mike Miles" },
                    { new Guid("3e0202fb-5a69-4e1e-a8d0-89e82a16b19b"), 100, false, "TEST Name" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("2a24be71-c812-4509-a239-3c0673feb1bf"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("3e0202fb-5a69-4e1e-a8d0-89e82a16b19b"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("5d37153c-2dff-4b79-a2f5-c2404d676667"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("a9c164ae-8492-4719-bb85-01e3b8c5c08d"));

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "Student");

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "StudentId", "Age", "Name" },
                values: new object[,]
                {
                    { new Guid("514bc322-3c3c-4349-ae65-7235e931d21f"), 30, "John Doe" },
                    { new Guid("79e98ded-86ce-440b-ac00-c3dd970b76df"), 25, "Jane Doe" },
                    { new Guid("88f241e2-f6d0-4d19-9e16-04c4e109afa7"), 28, "Mike Miles" },
                    { new Guid("41979a5e-3309-4cd6-bdec-a9741ad55f9f"), 100, "TEST Name" }
                });
        }
    }
}
