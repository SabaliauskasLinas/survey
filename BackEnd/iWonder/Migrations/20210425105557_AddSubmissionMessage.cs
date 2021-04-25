using Microsoft.EntityFrameworkCore.Migrations;

namespace iWonder.Migrations
{
    public partial class AddSubmissionMessage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SubmissionMessage",
                table: "Surveys",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubmissionMessage",
                table: "Surveys");
        }
    }
}
