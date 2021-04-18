using Microsoft.EntityFrameworkCore.Migrations;

namespace iWonder.Migrations
{
    public partial class TextToContent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Text",
                table: "Answers",
                newName: "Content");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Content",
                table: "Answers",
                newName: "Text");
        }
    }
}
