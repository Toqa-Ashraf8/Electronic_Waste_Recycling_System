using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ElectronicWasteAPI.Migrations
{
    /// <inheritdoc />
    public partial class updateOrderDispatches2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PickUpAddress",
                table: "OrderDispatches",
                newName: "ShippingAddress");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShippingAddress",
                table: "OrderDispatches",
                newName: "PickUpAddress");
        }
    }
}
