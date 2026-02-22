namespace Glass.Api.Models;

public class SalesReportDto
{
    public string CrNo { get; set; } = string.Empty;

    public DateTime? SODate { get; set; }

    public string? PartyName { get; set; }

    public string? Thickness { get; set; }

    public int? TotalQty { get; set; }

    public decimal? TotalSQM { get; set; }

    public string? Status { get; set; }

    public string? BPlant { get; set; }

    public string? Process { get; set; }

    public DateTime? RBD { get; set; }

    public DateTime? RTD { get; set; }

    public DateTime? DeliveryDate { get; set; }
}
