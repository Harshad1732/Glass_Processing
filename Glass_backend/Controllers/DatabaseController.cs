using Glass.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Glass.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DatabaseController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public DatabaseController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("can-connect")]
    public async Task<IActionResult> CanConnect(CancellationToken cancellationToken)
    {
        var canConnect = await _dbContext.Database.CanConnectAsync(cancellationToken);
        return Ok(new { canConnect });
    }

    [HttpGet("tables")]
    public async Task<IActionResult> GetTables(CancellationToken cancellationToken)
    {
        const string sql = """
            SELECT TABLE_SCHEMA + '.' + TABLE_NAME
            FROM INFORMATION_SCHEMA.TABLES
            WHERE TABLE_TYPE = 'BASE TABLE'
            ORDER BY TABLE_SCHEMA, TABLE_NAME
            """;

        var tableNames = await _dbContext.Database.SqlQueryRaw<string>(sql).ToListAsync(cancellationToken);
        return Ok(tableNames);
    }
}
