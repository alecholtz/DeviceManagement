using Accessors;
using Accessors.ConnectionProviders;
using Accessors.Interfaces;
using Microsoft.OpenApi.Models;
using Models.Configurations;
using Models.Converters;
using Models.Filters;
using System.Reflection;
using System.Text.Json.Serialization;
using WebApplication = Microsoft.AspNetCore.Builder.WebApplication;

var applicationName = Assembly.GetExecutingAssembly().GetName().Name;

var builder = WebApplication.CreateBuilder(args);

try
{
    // FOR DEVELOPMENT ONLY; DO NOT USE IN PROD
    builder.Services.AddCors(options => {
        options.AddPolicy(
            name: "devPolicy",
            builder =>
            {
                builder.WithOrigins(["http://localhost:5173"])
                .WithHeaders(["authorization", "content-type"])
                .WithMethods(["GET", "PUT", "POST", "DELETE"]);
            });
    });

    // Add Swagger for self-generated API docs
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(options =>
    {
        options.SwaggerDoc("v1", new OpenApiInfo
        {
            Title = "Device Management API",
            Version = "v1"
        });

        var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFilename);
        if (File.Exists(xmlPath))
        {
            options.IncludeXmlComments(xmlPath);
        }
    });

    builder.Services.AddControllers().AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.RespectNullableAnnotations = true;

        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        options.JsonSerializerOptions.Converters.Add(new EmptyToNullStringConverter());
    });

    builder.Services.AddOptions<DatabaseConfiguration>()
        .BindConfiguration(nameof(DatabaseConfiguration))
        .ValidateDataAnnotations()
        .ValidateOnStart();

    builder.Services.AddScoped<DatabaseConnectionProvider>();

    builder.Services.AddScoped<IDeviceAccessor, DeviceAccessor>();

    builder.Services.AddScoped<ExceptionFilter>();

    builder.Services.AddMvc(opts =>
    {
        opts.Filters.Add<ExceptionFilter>();
    });

    var app = builder.Build();

    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    logger.LogInformation("Starting up application: {applicationName}", applicationName);

    app.UseHttpsRedirection();

    // FOR DEVELOPMENT ONLY; DO NOT USE IN PROD
    app.UseCors("devPolicy");

    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Device Management API v1");
        options.RoutePrefix = "swagger";
    });

    app.MapControllers();

    app.Run();
}
catch (Exception exception)
{
    Console.Error.WriteLine($"{applicationName} has stopped due to an exception: {exception}");
}