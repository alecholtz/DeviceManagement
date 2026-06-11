using Models.Enums;

namespace Models.Records;

/// <summary>
/// A sealed record containing the details of a device.
/// </summary>
public sealed record Device(
    int DeviceId,
    string Name,
    string IPAddress,
    DeviceStatus DeviceStatus,
    DeviceType DeviceType,
    string? DeviceTypeDescription);