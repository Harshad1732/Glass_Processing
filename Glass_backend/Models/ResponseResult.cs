namespace Glass.Api.Models;

public class ResponseResult
{
    public bool Status { get; set; }

    public string AckMsg { get; set; } = string.Empty;

    public object? Data { get; set; }
}
