CREATE PROCEDURE [dm].[CreateDevice]
	@name VARCHAR(255),
	@ipAddress VARCHAR(15),
	@deviceTypeId TINYINT,
	@statusId TINYINT,
	@deviceTypeDescription VARCHAR(50),
	@deviceId INT OUTPUT

AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO [dm].[Devices] (
		[Name],
		[IPAddress],
		[DeviceTypeId],
		[StatusId],
		[DeviceTypeDescription]
	)
	VALUES (
		@name,
		@ipAddress,
		@deviceTypeId,
		@statusId,
		@deviceTypeDescription
	);

	SELECT @deviceId = SCOPE_IDENTITY();
END;