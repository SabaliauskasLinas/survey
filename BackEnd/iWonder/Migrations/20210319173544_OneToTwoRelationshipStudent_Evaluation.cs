using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace iWonder.Migrations
{
    public partial class OneToTwoRelationshipStudent_Evaluation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("037f7110-c80f-4898-82ae-2f45b47c05e0"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("5e6468c2-7ba8-42ca-9cc9-673107915528"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("61091726-4bfc-4c55-9f41-fad1762f9f45"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("e30508e8-fa0b-4552-8182-eb2e2e6307d6"));

            migrationBuilder.CreateTable(
                name: "Evaluation",
                columns: table => new
                {
                    EvaluationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Grade = table.Column<int>(type: "int", nullable: false),
                    AdditionalExplanation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StudentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Evaluation", x => x.EvaluationId);
                    table.ForeignKey(
                        name: "FK_Evaluation_Student_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Student",
                        principalColumn: "StudentId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "StudentId", "Age", "Name" },
                values: new object[,]
                {
                    { new Guid("baf89a6a-5362-461c-bfeb-9c1ff238e42e"), 30, "John Doe" },
                    { new Guid("89626a6c-15a2-4285-b428-a8d4239ead11"), 25, "Jane Doe" },
                    { new Guid("e88f51cc-7610-4748-887e-200f85ef45c0"), 28, "Mike Miles" },
                    { new Guid("06bfc0f9-6450-4a14-a59a-bb4c05f8aa30"), 100, "TEST Name" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Evaluation_StudentId",
                table: "Evaluation",
                column: "StudentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Evaluation");

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("06bfc0f9-6450-4a14-a59a-bb4c05f8aa30"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("89626a6c-15a2-4285-b428-a8d4239ead11"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("baf89a6a-5362-461c-bfeb-9c1ff238e42e"));

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "StudentId",
                keyValue: new Guid("e88f51cc-7610-4748-887e-200f85ef45c0"));

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "StudentId", "Age", "Name" },
                values: new object[,]
                {
                    { new Guid("e30508e8-fa0b-4552-8182-eb2e2e6307d6"), 30, "John Doe" },
                    { new Guid("037f7110-c80f-4898-82ae-2f45b47c05e0"), 25, "Jane Doe" },
                    { new Guid("61091726-4bfc-4c55-9f41-fad1762f9f45"), 28, "Mike Miles" },
                    { new Guid("5e6468c2-7ba8-42ca-9cc9-673107915528"), 100, "TEST Name" }
                });
        }
    }
}
