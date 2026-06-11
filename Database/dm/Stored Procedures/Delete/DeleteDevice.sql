CREATE PROCEDURE [dm].[DeleteDevice]
	@deviceId INT

AS
BEGIN
	SET NOCOUNT ON;

	DELETE FROM [dm].[Devices]
	WHERE [DeviceId] = @deviceId;

END;