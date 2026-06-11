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
