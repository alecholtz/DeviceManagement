GO
CREATE SCHEMA [dm]
    AUTHORIZATION [dbo];

GO
CREATE TABLE [dm].[DeviceStatuses]
(
	[StatusId] TINYINT NOT NULL,
	[Name] VARCHAR(50) NOT NULL,

	CONSTRAINT [PK_dm_DeviceStatuses_StatusId] PRIMARY KEY ([StatusId]),
	CONSTRAINT [UC_dm_DeviceStatuses_Name] UNIQUE ([Name])
);

GO
CREATE TABLE [dm].[DeviceTypes]
(
	[TypeId] TINYINT NOT NULL,
	[Name] VARCHAR(50) NOT NULL,

	CONSTRAINT [PK_dm_DeviceTypes_TypeId] PRIMARY KEY ([TypeId]),
	CONSTRAINT [UC_dm_DeviceTypes_Name] UNIQUE ([Name])
);

GO
CREATE TABLE [dm].[Devices]
(
	[DeviceId] INT IDENTITY(1, 1) NOT NULL,
	[Name] VARCHAR(255) NOT NULL,
	[IPAddress] VARCHAR(15) NOT NULL,
	[DeviceTypeId] TINYINT NOT NULL,
	[StatusId] TINYINT NOT NULL,
	[DeviceTypeDescription] VARCHAR(50) NULL,

	CONSTRAINT [PK_dm_Devices_DeviceId] PRIMARY KEY ([DeviceId]),
	CONSTRAINT [UC_dm_Devices_Name] UNIQUE ([Name]),
	CONSTRAINT [FK_dm_Devices_DeviceTypes_DeviceTypeId] FOREIGN KEY ([DeviceTypeId]) REFERENCES [dm].[DeviceTypes] ([TypeId]),
	CONSTRAINT [FK_dm_Devices_DeviceStatuses_StatusId] FOREIGN KEY ([StatusId]) REFERENCES [dm].[DeviceStatuses] ([StatusId]),
);

GO
INSERT INTO [dm].[DeviceTypes] ([TypeId], [Name])
VALUES
	(1, 'Camera'),
	(2, 'Window Shade'),
	(3, 'Lightbulb'),
	(4, 'Doorbell'),
	(5, 'Other');

INSERT INTO [dm].[DeviceStatuses] ([StatusId], [Name])
VALUES
	(1, 'Online'),
	(2, 'Offline'),
	(3, 'Maintanence');-- Write your own SQL object definition here, and it'll be included in your package.

GO

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

GO
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

GO
CREATE PROCEDURE [dm].[DeleteDevice]
	@deviceId INT

AS
BEGIN
	SET NOCOUNT ON;

	DELETE FROM [dm].[Devices]
	WHERE [DeviceId] = @deviceId;

END;

GO
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
GO