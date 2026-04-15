using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ElectronicWasteAPI.Migrations
{
    /// <inheritdoc />
    public partial class setProductsCart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_SellRequests_SellRequestRequestID",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_SellRequestRequestID",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "SellRequestRequestID",
                table: "Orders");

            migrationBuilder.CreateTable(
                name: "CartCategories",
                columns: table => new
                {
                    CategoryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartCategories", x => x.CategoryID);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    serial = table.Column<int>(type: "int", nullable: true),
                    ProductName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductPrice = table.Column<int>(type: "int", nullable: true),
                    Stock = table.Column<int>(type: "int", nullable: true),
                    Points = table.Column<int>(type: "int", nullable: true),
                    ProductImagePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CategoryID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CartCategories");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.AddColumn<int>(
                name: "SellRequestRequestID",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_SellRequestRequestID",
                table: "Orders",
                column: "SellRequestRequestID");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_SellRequests_SellRequestRequestID",
                table: "Orders",
                column: "SellRequestRequestID",
                principalTable: "SellRequests",
                principalColumn: "RequestID");
        }
    }
}
