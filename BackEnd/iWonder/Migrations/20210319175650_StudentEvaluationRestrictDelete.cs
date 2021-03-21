using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace iWonder.Migrations
{
    public partial class StudentEvaluationRestrictDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Evaluation_Student_StudentId",
                table: "Evaluation");

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("7a5d7f81-c1b7-4205-bdea-e7ba790bc005"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("dbb24537-1f3a-4573-90c6-ec0fe87ce81c"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("dcc4f3ec-60f7-46f5-98ce-19bdf2f41774"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("f41d11c8-0cb3-4804-9b2f-b334ef14b0fc"));

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

            migrationBuilder.AddForeignKey(
                name: "FK_Evaluation_Student_StudentId",
                table: "Evaluation",
                column: "StudentId",
                principalTable: "Student",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Evaluation_Student_StudentId",
                table: "Evaluation");

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

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "StudentId", "Age", "Name" },
                values: new object[,]
                {
                    { new Guid("dcc4f3ec-60f7-46f5-98ce-19bdf2f41774"), 30, "John Doe" },
                    { new Guid("7a5d7f81-c1b7-4205-bdea-e7ba790bc005"), 25, "Jane Doe" },
                    { new Guid("dbb24537-1f3a-4573-90c6-ec0fe87ce81c"), 28, "Mike Miles" },
                    { new Guid("f41d11c8-0cb3-4804-9b2f-b334ef14b0fc"), 100, "TEST Name" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Evaluation_Student_StudentId",
                table: "Evaluation",
                column: "StudentId",
                principalTable: "Student",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
