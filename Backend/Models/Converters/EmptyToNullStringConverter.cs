using System.Text.Json;
using System.Text.Json.Serialization;

namespace Models.Converters;

/// <summary>
/// A class for converting incoming string values from 
/// </summary>
public class EmptyToNullStringConverter : JsonConverter<string>
{
    /// <inheritdoc />
    public override string? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        string? value = reader.GetString();
        return string.IsNullOrWhiteSpace(value) ? null : value;
    }

    /// <inheritdoc />
    public override void Write(Utf8JsonWriter writer, string value, JsonSerializerOptions options)
        => writer.WriteStringValue(value);
}