using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System.Net;

namespace Models.Filters;

/// <summary>
/// A filter for handling and logging exceptions.
/// </summary>
public sealed class ExceptionFilter(ILogger<ExceptionFilter> logger) : IExceptionFilter
{
    private readonly ILogger<ExceptionFilter> _logger = logger;

    /// <inheritdoc/>
    public void OnException(ExceptionContext context)
    {
        var statusCode = (int)GetStatusCode(context.Exception);
        var logLevel = statusCode >= 500 ? LogLevel.Error : LogLevel.Warning;
        var message = context.Exception is AggregateException aggregateException
            ? string.Join(", ", aggregateException.InnerException)
            : context.Exception.Message;

        var errorResponse = new { message = context.Exception.Message };
        context.Result = new ObjectResult(errorResponse)
        {
            StatusCode = statusCode
        };

        _logger.Log(logLevel, context.Exception, message);
    }

    /// <summary>
    /// Returns a status code for each exception.
    /// </summary>
    private static HttpStatusCode GetStatusCode(Exception exception) => exception switch
    {
        //FUTURE IMPROVEMENTS: Add custom exceptions here
        _ => HttpStatusCode.InternalServerError,
    };
}
