using Models.Records;
using Models.Requests;

namespace Accessors.Interfaces;

/// <summary>
/// An interface defining methods for accessing device information.
/// </summary>
public interface IDeviceAccessor
{
    /// <summary>
    /// Gets all devices.
    /// </summary>
    public Task<IEnumerable<Device>> GetAllDevicesAsync();

    /// <summary>
    /// Deletes a device.
    /// </summary>
    public Task DeleteDeviceAsync(int deviceId);

    /// <summary>
    /// Updates a device.
    /// </summary>
    public Task UpdateDeviceAsync(int deviceId, DeviceRequest deviceRequest);

    /// <summary>
    /// Creates a new device.
    /// </summary>
    public Task<int> CreateDeviceAsync(DeviceRequest deviceRequest);
}
