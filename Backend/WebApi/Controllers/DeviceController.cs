using Accessors.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models.Enums;
using Models.Requests;

namespace WebApi.Controllers;

/// <summary>
/// A controller for accessing device information.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public sealed class DeviceController(IDeviceAccessor deviceAccessor) : ControllerBase
{
    /// <summary>
    /// Gets devices.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetDevicesAsync() => Ok(await deviceAccessor.GetAllDevicesAsync());

    /// <summary>
    /// Deletes a device.
    /// </summary>
    [HttpDelete("{deviceId}")]
    public async Task<IActionResult> DeleteDeviceAsync([FromRoute] int deviceId)
    {
        await deviceAccessor.DeleteDeviceAsync(deviceId);
        return Ok();
    }

    /// <summary>
    /// Updates a device.
    /// </summary>
    [HttpPut("{deviceId}")]
    public async Task<IActionResult> UpdateDeviceAsync([FromRoute] int deviceId, [FromBody] DeviceRequest deviceRequest)
    {
        if (deviceRequest.DeviceType == DeviceType.Other && deviceRequest.DeviceTypeDescription is null)
            return BadRequest();

        await deviceAccessor.UpdateDeviceAsync(deviceId, deviceRequest);
        return Ok();
    }

    /// <summary>
    /// Creates a new device.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateDeviceAsync([FromBody] DeviceRequest deviceRequest)
    {
        if (deviceRequest.DeviceType == DeviceType.Other && deviceRequest.DeviceTypeDescription is null)
            return BadRequest();

        return Ok(await deviceAccessor.CreateDeviceAsync(deviceRequest));
    }
}
