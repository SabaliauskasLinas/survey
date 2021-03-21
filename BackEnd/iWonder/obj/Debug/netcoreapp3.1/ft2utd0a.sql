IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Student] (
    [StudentId] uniqueidentifier NOT NULL,
    [AnotherKeyProperty] uniqueidentifier NOT NULL,
    [Name] nvarchar(50) NOT NULL,
    [Age] int NULL,
    [IsRegularStudent] bit NOT NULL DEFAULT CAST(1 AS bit),
    CONSTRAINT [PK_Student] PRIMARY KEY ([StudentId], [AnotherKeyProperty])
);
GO

CREATE PROCEDURE MyCustomProcedure
                               AS
                               SELECT * FROM Student
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210318195940_InitialMigration', N'5.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [Student] DROP CONSTRAINT [PK_Student];
GO

ALTER TABLE [Student] ADD CONSTRAINT [PK_Student] PRIMARY KEY ([StudentId]);
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'StudentId', N'Age', N'AnotherKeyProperty', N'Name') AND [object_id] = OBJECT_ID(N'[Student]'))
    SET IDENTITY_INSERT [Student] ON;
INSERT INTO [Student] ([StudentId], [Age], [AnotherKeyProperty], [Name])
VALUES ('32428fbb-d7af-4115-8242-362a03a9933a', 30, '00000000-0000-0000-0000-000000000000', N'John Doe');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'StudentId', N'Age', N'AnotherKeyProperty', N'Name') AND [object_id] = OBJECT_ID(N'[Student]'))
    SET IDENTITY_INSERT [Student] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'StudentId', N'Age', N'AnotherKeyProperty', N'Name') AND [object_id] = OBJECT_ID(N'[Student]'))
    SET IDENTITY_INSERT [Student] ON;
INSERT INTO [Student] ([StudentId], [Age], [AnotherKeyProperty], [Name])
VALUES ('f9610e26-003e-44eb-8945-25d60a7ab036', 25, '00000000-0000-0000-0000-000000000000', N'Jane Doe');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'StudentId', N'Age', N'AnotherKeyProperty', N'Name') AND [object_id] = OBJECT_ID(N'[Student]'))
    SET IDENTITY_INSERT [Student] OFF;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210318203620_SeedInitialData', N'5.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DELETE FROM [Student]
WHERE [StudentId] = '32428fbb-d7af-4115-8242-362a03a9933a';
SELECT @@ROWCOUNT;

GO

DELETE FROM [Student]
WHERE [StudentId] = 'f9610e26-003e-44eb-8945-25d60a7ab036';
SELECT @@ROWCOUNT;

GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'StudentId', N'Age', N'AnotherKeyProperty', N'Name') AND [object_id] = OBJECT_ID(N'[Student]'))
    SET IDENTITY_INSERT [Student] ON;
INSERT INTO [Student] ([StudentId], [Age], [AnotherKeyProperty], [Name])
VALUES ('b4c82ec7-2b82-4b56-a6fe-e24da7b9fec1', 30, '00000000-0000-0000-0000-000000000000', N'John Doe');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'StudentId', N'Age', N'AnotherKeyProperty', N'Name') AND [object_id] = OBJECT_ID(N'[Student]'))
    SET IDENTITY_INSERT [Student] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'StudentId', N'Age', N'AnotherKeyProperty', N'Name') AND [object_id] = OBJECT_ID(N'[Student]'))
    SET IDENTITY_INSERT [Student] ON;
INSERT INTO [Student] ([StudentId], [Age], [AnotherKeyProperty], [Name])
VALUES ('25be1a66-4eed-437f-baef-e998402e19e0', 25, '00000000-0000-0000-0000-000000000000', N'Jane Doe');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'StudentId', N'Age', N'AnotherKeyProperty', N'Name') AND [object_id] = OBJECT_ID(N'[Student]'))
    SET IDENTITY_INSERT [Student] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'StudentId', N'Age', N'AnotherKeyProperty', N'Name') AND [object_id] = OBJECT_ID(N'[Student]'))
    SET IDENTITY_INSERT [Student] ON;
INSERT INTO [Student] ([StudentId], [Age], [AnotherKeyProperty], [Name])
VALUES ('215e48b5-b97e-4638-afe0-fc9752d5c741', 28, '00000000-0000-0000-0000-000000000000', N'Mike Miles');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'StudentId', N'Age', N'AnotherKeyProperty', N'Name') AND [object_id] = OBJECT_ID(N'[Student]'))
    SET IDENTITY_INSERT [Student] OFF;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210318204220_AdditionalRowInserted', N'5.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DELETE FROM [Student]
WHERE [StudentId] = '215e48b5-b97e-4638-afe0-fc9752d5c741';
SELECT @@ROWCOUNT;

GO

DELETE FROM [Student]
WHERE [StudentId] = '25be1a66-4eed-437f-baef-e998402e19e0';
SELECT @@ROWCOUNT;

GO

DELETE FROM [Student]
WHERE [StudentId] = 'b4c82ec7-2b82-4b56-a6fe-e24da7b9fec1';
SELECT @@ROWCOUNT;

GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'StudentId', N'Age', N'AnotherKeyProperty', N'Name') AND [object_id] = OBJECT_ID(N'[Student]'))
    SET IDENTITY_INSERT [Student] ON;
INSERT INTO [Student] ([StudentId], [Age], [AnotherKeyProperty], [Name])
VALUES ('ad64d7f4-c67d-44f3-88f5-270219f0b1fe', 30, '00000000-0000-0000-0000-000000000000', N'John Doe'),
('cedae50b-b1d1-4da7-93a1-269e819eb55d', 25, '00000000-0000-0000-0000-000000000000', N'Jane Doe'),
('bfa6b9db-f1c9-4446-b3a4-1ec1aa8ca383', 28, '00000000-0000-0000-0000-000000000000', N'Mike Miles'),
('03527a1c-0e3a-48d7-bacc-608b5cd8acaa', 100, '00000000-0000-0000-0000-000000000000', N'TEST Name');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'StudentId', N'Age', N'AnotherKeyProperty', N'Name') AND [object_id] = OBJECT_ID(N'[Student]'))
    SET IDENTITY_INSERT [Student] OFF;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210318205322_RevertTestMigration', N'5.0.4');
GO

COMMIT;
GO

