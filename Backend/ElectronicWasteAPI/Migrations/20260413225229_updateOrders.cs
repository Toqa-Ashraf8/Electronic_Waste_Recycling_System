using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ElectronicWasteAPI.Migrations
{
    /// <inheritdoc />
    public partial class updateOrders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryID",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CheckDate",
                table: "Orders",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ItemID",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Points",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "QualityID",
                table: "Orders",
                type: "int",
                nullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_SellRequests_SellRequestRequestID",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_SellRequestRequestID",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CategoryID",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CheckDate",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ItemID",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Points",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "QualityID",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "SellRequestRequestID",
                table: "Orders");
        }
    }
}
