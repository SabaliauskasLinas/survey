using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace iWonder.Migrations
{
    public partial class RevertTestMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                values: new object[,]
                {
                    { new Guid("ad64d7f4-c67d-44f3-88f5-270219f0b1fe"), 30, new Guid("00000000-0000-0000-0000-000000000000"), "John Doe" },
                    { new Guid("cedae50b-b1d1-4da7-93a1-269e819eb55d"), 25, new Guid("00000000-0000-0000-0000-000000000000"), "Jane Doe" },
                    { new Guid("bfa6b9db-f1c9-4446-b3a4-1ec1aa8ca383"), 28, new Guid("00000000-0000-0000-0000-000000000000"), "Mike Miles" },
                    { new Guid("03527a1c-0e3a-48d7-bacc-608b5cd8acaa"), 100, new Guid("00000000-0000-0000-0000-000000000000"), "TEST Name" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("03527a1c-0e3a-48d7-bacc-608b5cd8acaa"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("ad64d7f4-c67d-44f3-88f5-270219f0b1fe"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("bfa6b9db-f1c9-4446-b3a4-1ec1aa8ca383"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("cedae50b-b1d1-4da7-93a1-269e819eb55d"));

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
    }
}
