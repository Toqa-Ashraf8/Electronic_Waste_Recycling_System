using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ElectronicWasteAPI.Migrations
{
    /// <inheritdoc />
    public partial class setPointsUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Points",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CartCategoryCategoryID",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_CartCategoryCategoryID",
                table: "Products",
                column: "CartCategoryCategoryID");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_CartCategories_CartCategoryCategoryID",
                table: "Products",
                column: "CartCategoryCategoryID",
                principalTable: "CartCategories",
                principalColumn: "CategoryID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_CartCategories_CartCategoryCategoryID",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_CartCategoryCategoryID",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Points",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CartCategoryCategoryID",
                table: "Products");
        }
    }
}
