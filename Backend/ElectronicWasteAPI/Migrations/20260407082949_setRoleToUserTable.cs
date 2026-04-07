using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ElectronicWasteAPI.Migrations
{
    /// <inheritdoc />
    public partial class setRoleToUserTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserPhoto",
                table: "Register",
                newName: "UserImagePath");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Register",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "Register");

            migrationBuilder.RenameColumn(
                name: "UserImagePath",
                table: "Register",
                newName: "UserPhoto");
        }
    }
}
