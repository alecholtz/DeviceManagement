CREATE PROCEDURE [dm].[UpdateDevice]
	@deviceId INT,
	@name VARCHAR(255),
	@ipAddress VARCHAR(15),
	@deviceTypeId TINYINT,
	@statusId TINYINT,
	@deviceTypeDescription VARCHAR(50)

AS
BEGIN
	SET NOCOUNT ON;

	UPDATE
		[dm].[Devices]
	SET
		[Name] = @name,
		[IPAddress] = @ipAddress,
		[DeviceTypeId] = @deviceTypeId,
		[StatusId] = @statusId,
		[DeviceTypeDescription] = @deviceTypeDescription
	WHERE
		[DeviceId] = @deviceId;
END;