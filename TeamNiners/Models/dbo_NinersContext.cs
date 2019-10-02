using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TeamNiners.Models
{
    public partial class dbo_NinersContext : DbContext
    {
        public dbo_NinersContext()
        {
        }

        public dbo_NinersContext(DbContextOptions<dbo_NinersContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Business> Business { get; set; }
        public virtual DbSet<BusinessLogin> BusinessLogin { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=dbo_Niners;Integrated Security=True;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Business>(entity =>
            {
                entity.Property(e => e.BusinessId).HasColumnName("businessID");

                entity.Property(e => e.BusinessAddress)
                    .IsRequired()
                    .HasColumnName("businessAddress")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.BusinessCity)
                    .IsRequired()
                    .HasColumnName("businessCity")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.BusinessCountry)
                    .IsRequired()
                    .HasColumnName("businessCountry")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.BusinessName)
                    .IsRequired()
                    .HasColumnName("businessName")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.BusinessPhoneNumber)
                    .IsRequired()
                    .HasColumnName("businessPhoneNumber")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.BusinessPostalCode)
                    .IsRequired()
                    .HasColumnName("businessPostalCode")
                    .HasMaxLength(9)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<BusinessLogin>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Psswd)
                    .IsRequired()
                    .HasColumnName("psswd")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Token)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.BusinessLogin)
                    .HasForeignKey<BusinessLogin>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__BusinessLogi__ID__25869641");
            });
        }
    }
}
