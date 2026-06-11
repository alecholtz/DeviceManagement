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
	(3, 'Maintanence');