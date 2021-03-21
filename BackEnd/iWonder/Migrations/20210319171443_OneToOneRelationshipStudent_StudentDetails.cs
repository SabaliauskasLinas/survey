using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace iWonder.Migrations
{
    public partial class OneToOneRelationshipStudent_StudentDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "AnotherKeyProperty",
                table: "Student");

            migrationBuilder.CreateTable(
                name: "StudentDetails",
                columns: table => new
                {
                    StudentDetailsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AdditionalInformation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StudentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentDetails", x => x.StudentDetailsId);
                    table.ForeignKey(
                        name: "FK_StudentDetails_Student_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Student",
                        principalColumn: "StudentId",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_StudentDetails_StudentId",
                table: "StudentDetails",
                column: "StudentId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentDetails");

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

            migrationBuilder.AddColumn<Guid>(
                name: "AnotherKeyProperty",
                table: "Student",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

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
    }
}
