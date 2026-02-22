using Microsoft.EntityFrameworkCore;
using Glass.Api.Models;

namespace Glass.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<SalesReportDto> SalesReportDto => Set<SalesReportDto>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<SalesReportDto>().HasNoKey();
    }
}
