CREATE TABLE [dm].[DeviceTypes]
(
	[TypeId] TINYINT NOT NULL,
	[Name] VARCHAR(50) NOT NULL,

	CONSTRAINT [PK_dm_DeviceTypes_TypeId] PRIMARY KEY ([TypeId]),
	CONSTRAINT [UC_dm_DeviceTypes_Name] UNIQUE ([Name])
);