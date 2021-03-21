using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace iWonder.Migrations
{
    public partial class ManyToManyRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("0c0c1a85-377c-4e0f-9914-f079626e30b7"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("14fc1f40-f7c4-4df5-b556-fceed4e722e8"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("6fb93e86-d762-4737-8bd0-22e983b35b25"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("d1250fed-ab98-45d0-b954-c49d18d6ec4d"));

            migrationBuilder.CreateTable(
                name: "Subject",
                columns: table => new
                {
                    SubjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SubjectName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subject", x => x.SubjectId);
                });

            migrationBuilder.CreateTable(
                name: "StudentSubject",
                columns: table => new
                {
                    StudentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SubjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentSubject", x => new { x.StudentId, x.SubjectId });
                    table.ForeignKey(
                        name: "FK_StudentSubject_Student_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Student",
                        principalColumn: "StudentId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentSubject_Subject_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subject",
                        principalColumn: "SubjectId",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_StudentSubject_SubjectId",
                table: "StudentSubject",
                column: "SubjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentSubject");

            migrationBuilder.DropTable(
                name: "Subject");

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
                    { new Guid("0c0c1a85-377c-4e0f-9914-f079626e30b7"), 30, "John Doe" },
                    { new Guid("d1250fed-ab98-45d0-b954-c49d18d6ec4d"), 25, "Jane Doe" },
                    { new Guid("14fc1f40-f7c4-4df5-b556-fceed4e722e8"), 28, "Mike Miles" },
                    { new Guid("6fb93e86-d762-4737-8bd0-22e983b35b25"), 100, "TEST Name" }
                });
        }
    }
}
