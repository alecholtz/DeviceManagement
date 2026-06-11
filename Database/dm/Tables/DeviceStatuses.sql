CREATE TABLE [dm].[DeviceStatuses]
(
	[StatusId] TINYINT NOT NULL,
	[Name] VARCHAR(50) NOT NULL,

	CONSTRAINT [PK_dm_DeviceStatuses_StatusId] PRIMARY KEY ([StatusId]),
	CONSTRAINT [UC_dm_DeviceStatuses_Name] UNIQUE ([Name])
);