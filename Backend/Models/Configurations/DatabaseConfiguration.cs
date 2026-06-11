using System.ComponentModel.DataAnnotations;

namespace Models.Configurations;

/// <summary>
/// A sealed record containing a database configuration.
/// </summary>
public sealed record DatabaseConfiguration
{
    [Required]
    public required string ConnectionString { get; init; }
}