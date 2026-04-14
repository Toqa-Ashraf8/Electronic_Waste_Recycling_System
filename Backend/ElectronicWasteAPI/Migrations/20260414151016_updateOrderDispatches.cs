using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ElectronicWasteAPI.Migrations
{
    /// <inheritdoc />
    public partial class updateOrderDispatches : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RequestID",
                table: "OrderDispatches");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "OrderDispatches");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "OrderDispatches",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "OrderDispatches");

            migrationBuilder.AddColumn<int>(
                name: "RequestID",
                table: "OrderDispatches",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "OrderDispatches",
                type: "int",
                nullable: true);
        }
    }
}
