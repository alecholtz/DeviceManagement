using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using Models.Configurations;


namespace Accessors.ConnectionProviders;

/// <summary>
/// A sealed class for providing database connections.
/// </summary>
/// <remarks>
/// Constructor for <see cref="DatabaseConnectionProvider"/>.
/// </remarks>
public sealed class DatabaseConnectionProvider(IOptions<DatabaseConfiguration> config) : IDisposable
{
    private readonly SqlConnection _databaseConnection = new(config.Value.ConnectionString);

    /// <summary>
    /// Gets the <see cref="SqlConnection"/> and opens it if it is not already open.
    /// </summary>
    public SqlConnection DbConnection
    {
        get
        {
            if (_databaseConnection.State != System.Data.ConnectionState.Open)
                _databaseConnection.Open();

            return _databaseConnection;
        }
    }

    /// <inheritdoc/>
    public void Dispose()
    {
        if (_databaseConnection?.State != System.Data.ConnectionState.Closed)
            _databaseConnection?.Close();

        _databaseConnection?.Dispose();
    }
}