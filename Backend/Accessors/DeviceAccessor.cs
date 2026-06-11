using Accessors.ConnectionProviders;
using Accessors.Interfaces;
using Dapper;
using Microsoft.Data.SqlClient;
using Models.Records;
using Models.Requests;
using System.Data;


namespace Accessors;

/// <summary>
/// A sealed class for getting device information.
/// </summary>
public sealed class DeviceAccessor(DatabaseConnectionProvider connectionProvider) : IDeviceAccessor
{
    private static readonly string _deviceIdParameterName = "deviceId";

    private readonly SqlConnection _sqlConnection = connectionProvider.DbConnection;

    /// <inheritdoc />
    public async Task<IEnumerable<Device>> GetAllDevicesAsync()
        => await _sqlConnection.QueryAsync<Device>(
            sql: "[dm].[GetAllDevices]",
            commandType: CommandType.StoredProcedure);

    /// <inheritdoc />
    public async Task DeleteDeviceAsync(int deviceId)
        => await _sqlConnection.ExecuteAsync(
            sql: "[dm].[DeleteDevice]",
            param: new { deviceId },
            commandType: CommandType.StoredProcedure);

    /// <inheritdoc />
    public async Task UpdateDeviceAsync(int deviceId, DeviceRequest deviceRequest)
        => await _sqlConnection.ExecuteAsync(
            sql: "[dm].[UpdateDevice]",
            param: new
            {
                deviceId,
                name = deviceRequest.Name,
                ipAddress = deviceRequest.IPAddress,
                deviceTypeId = deviceRequest.DeviceType,
                statusId = deviceRequest.DeviceStatus,
                deviceTypeDescription = deviceRequest.DeviceTypeDescription,
            },
            commandType: CommandType.StoredProcedure);

    /// <inheritdoc />
    public async Task<int> CreateDeviceAsync(DeviceRequest deviceRequest)
    {
        var parameters = new DynamicParameters(
            new {
                name = deviceRequest.Name,
                ipAddress = deviceRequest.IPAddress,
                deviceTypeId = deviceRequest.DeviceType,
                statusId = deviceRequest.DeviceStatus,
                deviceTypeDescription = deviceRequest.DeviceTypeDescription
            });
        parameters.Add(name: _deviceIdParameterName, dbType: DbType.Int32, direction: ParameterDirection.Output);

        await _sqlConnection.ExecuteAsync(
            sql: "[dm].[CreateDevice]",
            param: parameters,
            commandType: CommandType.StoredProcedure);

        return parameters.Get<int>(_deviceIdParameterName);
    }
}
