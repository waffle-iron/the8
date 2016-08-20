﻿CREATE TABLE [dbo].[TEAM_ROLES]
(
	[TeamRoleId] TINYINT NOT NULL, 
    [Name] NVARCHAR(50) NOT NULL, 
    CONSTRAINT [PK__TEAM_ROLES] PRIMARY KEY ([TeamRoleId]), 
    CONSTRAINT [AK__TEAM_ROLES__Name] UNIQUE ([Name])
)
