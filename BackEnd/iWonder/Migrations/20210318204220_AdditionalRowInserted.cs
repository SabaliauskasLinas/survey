using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace iWonder.Migrations
{
    public partial class AdditionalRowInserted : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("32428fbb-d7af-4115-8242-362a03a9933a"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("f9610e26-003e-44eb-8945-25d60a7ab036"));

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "StudentId", "Age", "AnotherKeyProperty", "Name" },
                values: new object[] { new Guid("b4c82ec7-2b82-4b56-a6fe-e24da7b9fec1"), 30, new Guid("00000000-0000-0000-0000-000000000000"), "John Doe" });

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "StudentId", "Age", "AnotherKeyProperty", "Name" },
                values: new object[] { new Guid("25be1a66-4eed-437f-baef-e998402e19e0"), 25, new Guid("00000000-0000-0000-0000-000000000000"), "Jane Doe" });

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "StudentId", "Age", "AnotherKeyProperty", "Name" },
                values: new object[] { new Guid("215e48b5-b97e-4638-afe0-fc9752d5c741"), 28, new Guid("00000000-0000-0000-0000-000000000000"), "Mike Miles" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("215e48b5-b97e-4638-afe0-fc9752d5c741"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("25be1a66-4eed-437f-baef-e998402e19e0"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("b4c82ec7-2b82-4b56-a6fe-e24da7b9fec1"));

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "StudentId", "Age", "AnotherKeyProperty", "Name" },
                values: new object[] { new Guid("32428fbb-d7af-4115-8242-362a03a9933a"), 30, new Guid("00000000-0000-0000-0000-000000000000"), "John Doe" });

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "StudentId", "Age", "AnotherKeyProperty", "Name" },
                values: new object[] { new Guid("f9610e26-003e-44eb-8945-25d60a7ab036"), 25, new Guid("00000000-0000-0000-0000-000000000000"), "Jane Doe" });
        }
    }
}
