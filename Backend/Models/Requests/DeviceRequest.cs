
using Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace Models.Requests;

/// <summary>
/// A sealed record containing the details of a device request.
/// </summary>
public sealed record DeviceRequest(
    [StringLength(255, MinimumLength = 1)] string Name,
    [StringLength(15, MinimumLength = 1)] string IPAddress,
    DeviceStatus DeviceStatus,
    DeviceType DeviceType,
    [StringLength(50)] string? DeviceTypeDescription);
