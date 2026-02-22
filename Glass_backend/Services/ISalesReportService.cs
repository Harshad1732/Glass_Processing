using Glass.Api.Models;

namespace Glass.Api.Services;

public interface ISalesReportService
{
    Task<ResponseResult> GetSalesReportAsync(string? crNo, int? partyId, string? partyName, string? bPlant);
}
