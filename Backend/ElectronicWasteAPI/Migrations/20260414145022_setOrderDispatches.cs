using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ElectronicWasteAPI.Migrations
{
    /// <inheritdoc />
    public partial class setOrderDispatches : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrderDispatches",
                columns: table => new
                {
                    DispatchID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderID = table.Column<int>(type: "int", nullable: true),
                    RequestID = table.Column<int>(type: "int", nullable: true),
                    UserID = table.Column<int>(type: "int", nullable: true),
                    PickUpAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CourierName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CourierPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ArrivalTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDispatches", x => x.DispatchID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderDispatches");
        }
    }
}
