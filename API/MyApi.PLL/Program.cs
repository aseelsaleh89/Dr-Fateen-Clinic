using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using MyApi.BLL.Service;
using MyApi.DAL.Data;
using MyApi.DAL.Models;


var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers();



builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));



// Identity

builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 6;

    options.User.RequireUniqueEmail = true;

    options.SignIn.RequireConfirmedEmail = true;

})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();




// JWT

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme =
        JwtBearerDefaults.AuthenticationScheme;

    options.DefaultChallengeScheme =
        JwtBearerDefaults.AuthenticationScheme;

})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,

        ValidateAudience = true,

        ValidateLifetime = true,

        ValidateIssuerSigningKey = true,


        ValidIssuer = builder.Configuration["Jwt:Issuer"],

        ValidAudience = builder.Configuration["Jwt:Audience"],


        IssuerSigningKey =
        new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
                builder.Configuration["Jwt:Key"]!
            )
        )
    };
});



builder.Services.AddAuthorization();




// Services

builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddScoped<IEmailSender, EmailSender>();

builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddScoped<AppointmentService>();

builder.Services.AddScoped<MedicalServiceManager>();

builder.Services.AddHttpContextAccessor();




builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();




// CORS

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy
        .WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});





var app = builder.Build();





// Create Roles + Admin

using (var scope = app.Services.CreateScope())
{

    var services = scope.ServiceProvider;


    var roleManager =
        services.GetRequiredService<RoleManager<IdentityRole>>();


    var userManager =
        services.GetRequiredService<UserManager<ApplicationUser>>();



    string[] roles =
    {
        "USER",
        "ADMIN"
    };



    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(
                new IdentityRole(role)
            );
        }
    }



    var adminEmail = "admin@test.com";


    var admin =
        await userManager.FindByEmailAsync(adminEmail);



    if(admin == null)
    {

        admin = new ApplicationUser
        {
            FullName = "System Admin",

            UserName = adminEmail,

            Email = adminEmail,

            EmailConfirmed = true
        };



        var result =
            await userManager.CreateAsync(
                admin,
                "Admin@123"
            );



        if(result.Succeeded)
        {
            await userManager.AddToRoleAsync(
                admin,
                "ADMIN"
            );
        }

    }

}




if(app.Environment.IsDevelopment())
{
    app.UseSwagger();

    app.UseSwaggerUI();
}



app.UseHttpsRedirection();



app.UseCors("ReactPolicy");



app.UseStaticFiles();



app.UseAuthentication();

app.UseAuthorization();



app.MapControllers();



app.Run();