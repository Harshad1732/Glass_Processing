using Glass.Api.Data;
using Glass.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Glass.Api.Services;

public class SalesReportService : ISalesReportService
{
    private readonly AppDbContext _context;

    public SalesReportService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ResponseResult> GetSalesReportAsync(string? crNo, int? partyId, string? partyName, string? bPlant)
    {
        var result = new ResponseResult();

        if (string.IsNullOrWhiteSpace(crNo) && !partyId.HasValue && string.IsNullOrWhiteSpace(partyName))
        {
            result.Status = false;
            result.AckMsg = "Please select Party or enter CR No";
            result.Data = null;
            return result;
        }

        try
        {
            var sql = "EXEC Usp_Get_SalesReport @CrNo = {0}, @PartyId = {1}";
            object crNoParam = string.IsNullOrWhiteSpace(crNo) ? DBNull.Value : crNo;
            object partyIdParam = partyId.HasValue ? partyId.Value : DBNull.Value;

            var data = await _context.SalesReportDto
                .FromSqlRaw(sql, crNoParam, partyIdParam)
                .AsNoTracking()
                .ToListAsync();

            if (!string.IsNullOrWhiteSpace(partyName))
            {
                data = data
                    .Where(x => !string.IsNullOrWhiteSpace(x.PartyName) &&
                                x.PartyName.Contains(partyName, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }

            if (!string.IsNullOrWhiteSpace(bPlant) &&
                !string.Equals(bPlant, "ALL", StringComparison.OrdinalIgnoreCase))
            {
                data = data
                    .Where(x => string.Equals(x.BPlant, bPlant, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }

            result.Status = true;
            result.AckMsg = "Sales report fetched successfully";
            result.Data = data;
        }
        catch
        {
            result.Status = false;
            result.AckMsg = "Error fetching sales report";
            result.Data = null;
        }

        return result;
    }
}
