using Glass.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Glass.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SalesReportController : ControllerBase
{
    private const string UserBranch = "ALL";
    private readonly ISalesReportService _salesReportService;

    public SalesReportController(ISalesReportService salesReportService)
    {
        _salesReportService = salesReportService;
    }

    [HttpGet]
    public async Task<IActionResult> GetSalesReport([FromQuery] string? crNo, [FromQuery] int? partyId, [FromQuery] string? partyName)
    {
        var result = await _salesReportService.GetSalesReportAsync(crNo, partyId, partyName, UserBranch);
        return Ok(result);
    }
}
