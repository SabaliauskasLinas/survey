using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace iWonder.Migrations
{
    public partial class RequiredFK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Evaluation_Student_StudentId",
                table: "Evaluation");

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

            migrationBuilder.AlterColumn<Guid>(
                name: "StudentId",
                table: "Evaluation",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Evaluation_Student_StudentId",
                table: "Evaluation",
                column: "StudentId",
                principalTable: "Student",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Evaluation_Student_StudentId",
                table: "Evaluation");

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

            migrationBuilder.AlterColumn<Guid>(
                name: "StudentId",
                table: "Evaluation",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Evaluation_Student_StudentId",
                table: "Evaluation",
                column: "StudentId",
                principalTable: "Student",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
