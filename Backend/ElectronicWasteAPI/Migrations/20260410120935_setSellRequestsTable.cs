using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ElectronicWasteAPI.Migrations
{
    /// <inheritdoc />
    public partial class setSellRequestsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SellRequests",
                columns: table => new
                {
                    RequestID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryID = table.Column<int>(type: "int", nullable: true),
                    DeviceCategory = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeviceBrand = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeviceItem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeviceQuality = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeviceCondition = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EstimatedPrice = table.Column<int>(type: "int", nullable: true),
                    DeviceImagePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PickUpMethod = table.Column<int>(type: "int", nullable: true),
                    ShippingAddress = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SellRequests", x => x.RequestID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SellRequests");
        }
    }
}
