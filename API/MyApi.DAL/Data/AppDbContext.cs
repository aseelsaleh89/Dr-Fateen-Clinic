using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyApi.DAL.Models;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;


namespace MyApi.DAL.Data
{
    public sealed class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {

        private readonly IHttpContextAccessor? _httpContextAccessor;



        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options,
            IHttpContextAccessor? httpContextAccessor = null
        ) : base(options)
        {
            _httpContextAccessor = httpContextAccessor;
        }


public DbSet<Review> Reviews { get; set; } = null!;

        // Clinic Tables

        public DbSet<Appointment> Appointments { get; set; } = null!;

        public DbSet<Patient> Patients { get; set; } = null!;

        public DbSet<MedicalService> MedicalServices { get; set; } = null!;
public DbSet<Payment> Payments { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

modelBuilder.Entity<Review>()
    .HasOne(r => r.User)
    .WithMany()
    .HasForeignKey(r => r.UserId)
    .OnDelete(DeleteBehavior.NoAction);
    modelBuilder.Entity<Payment>()
    .HasOne(p => p.Appointment)
    .WithOne()
    .HasForeignKey<Payment>(p => p.AppointmentId)
    .OnDelete(DeleteBehavior.Cascade);

            // Rename Identity Tables

            modelBuilder.Entity<ApplicationUser>()
                .ToTable("Users");


            modelBuilder.Entity<IdentityRole>()
                .ToTable("Roles");


            modelBuilder.Entity<IdentityUserRole<string>>()
                .ToTable("UserRoles");


            modelBuilder.Entity<IdentityUserClaim<string>>()
                .ToTable("UserClaims");


            modelBuilder.Entity<IdentityUserLogin<string>>()
                .ToTable("UserLogins");


            modelBuilder.Entity<IdentityRoleClaim<string>>()
                .ToTable("RoleClaims");


            modelBuilder.Entity<IdentityUserToken<string>>()
                .ToTable("UserTokens");



            // Patient - Appointment Relationship

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Patient)
                .WithMany()
                .HasForeignKey(a => a.PatientId)
                .OnDelete(DeleteBehavior.NoAction);



            // MedicalService - Appointment Relationship

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.MedicalService)
                .WithMany(s => s.Appointments)
                .HasForeignKey(a => a.MedicalServiceId)
                .OnDelete(DeleteBehavior.NoAction);

        }







        public override Task<int> SaveChangesAsync(
            CancellationToken cancellationToken = default
        )
        {


            var entries = ChangeTracker.Entries<BaseModel>();



            if (_httpContextAccessor is not null)
            {


                var currentUserId =
                    _httpContextAccessor
                    .HttpContext?
                    .User?
                    .FindFirstValue(ClaimTypes.NameIdentifier);



                foreach (var entityEntry in entries)
                {


                    if (entityEntry.State == EntityState.Added)
                    {

                        entityEntry.Property(x => x.CreatedBy)
                            .CurrentValue = currentUserId;


                        entityEntry.Property(x => x.CreatedAt)
                            .CurrentValue = DateTime.UtcNow;

                    }


                    else if (entityEntry.State == EntityState.Modified)
                    {


                        entityEntry.Property(x => x.UpdatedBy)
                            .CurrentValue = currentUserId;


                        entityEntry.Property(x => x.UpdatedAt)
                            .CurrentValue = DateTime.UtcNow;

                    }


                }


            }



            return base.SaveChangesAsync(cancellationToken);

        }








        public override int SaveChanges()
        {


            var entries = ChangeTracker.Entries<BaseModel>();



            var currentUserId =
                _httpContextAccessor?
                .HttpContext?
                .User?
                .FindFirstValue(ClaimTypes.NameIdentifier);




            foreach (var entityEntry in entries)
            {


                if (entityEntry.State == EntityState.Added)
                {


                    entityEntry.Property(x => x.CreatedBy)
                        .CurrentValue = currentUserId;


                    entityEntry.Property(x => x.CreatedAt)
                        .CurrentValue = DateTime.UtcNow;


                }



                else if (entityEntry.State == EntityState.Modified)
                {


                    entityEntry.Property(x => x.UpdatedBy)
                        .CurrentValue = currentUserId;


                    entityEntry.Property(x => x.UpdatedAt)
                        .CurrentValue = DateTime.UtcNow;


                }


            }



            return base.SaveChanges();

        }


    }
}