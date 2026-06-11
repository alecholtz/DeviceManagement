CREATE PROCEDURE [dm].[GetAllDevices]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT
		d.[DeviceId],
		d.[Name],
		d.[IPAddress],
		d.[StatusId] AS [DeviceStatus],
		d.[DeviceTypeId] AS [DeviceType],
		d.[DeviceTypeDescription]
	FROM
		[dm].[Devices] d;

END;