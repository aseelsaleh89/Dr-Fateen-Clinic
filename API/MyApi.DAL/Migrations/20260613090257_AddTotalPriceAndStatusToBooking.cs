using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyApi.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddTotalPriceAndStatusToBooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StripeSessionId",
                table: "Payments",
                newName: "StripePaymentIntentId");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "TotalPrice",
                table: "Bookings",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "StripePaymentIntentId",
                table: "Payments",
                newName: "StripeSessionId");
        }
    }
}
