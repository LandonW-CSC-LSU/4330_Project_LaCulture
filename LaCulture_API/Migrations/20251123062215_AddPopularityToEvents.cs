using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LaCulture.API.Migrations
{
    /// <inheritdoc />
    public partial class AddPopularityToEvents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Popularity",
                table: "Events",
                type: "float",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Popularity",
                table: "Events");
        }
    }
}
