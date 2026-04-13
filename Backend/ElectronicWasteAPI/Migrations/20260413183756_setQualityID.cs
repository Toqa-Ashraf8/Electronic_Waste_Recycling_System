using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ElectronicWasteAPI.Migrations
{
    /// <inheritdoc />
    public partial class setQualityID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QualityID",
                table: "SellRequests",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QualityID",
                table: "SellRequests");
        }
    }
}
