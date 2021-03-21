﻿// <auto-generated />
using System;
using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace iWonder.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20210318205322_RevertTestMigration")]
    partial class RevertTestMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.4")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Entities.Student", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("StudentId");

                    b.Property<int?>("Age")
                        .HasColumnType("int");

                    b.Property<Guid>("AnotherKeyProperty")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsRegularStudent")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(true);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Student");

                    b.HasData(
                        new
                        {
                            Id = new Guid("ad64d7f4-c67d-44f3-88f5-270219f0b1fe"),
                            Age = 30,
                            AnotherKeyProperty = new Guid("00000000-0000-0000-0000-000000000000"),
                            IsRegularStudent = false,
                            Name = "John Doe"
                        },
                        new
                        {
                            Id = new Guid("cedae50b-b1d1-4da7-93a1-269e819eb55d"),
                            Age = 25,
                            AnotherKeyProperty = new Guid("00000000-0000-0000-0000-000000000000"),
                            IsRegularStudent = false,
                            Name = "Jane Doe"
                        },
                        new
                        {
                            Id = new Guid("bfa6b9db-f1c9-4446-b3a4-1ec1aa8ca383"),
                            Age = 28,
                            AnotherKeyProperty = new Guid("00000000-0000-0000-0000-000000000000"),
                            IsRegularStudent = false,
                            Name = "Mike Miles"
                        },
                        new
                        {
                            Id = new Guid("03527a1c-0e3a-48d7-bacc-608b5cd8acaa"),
                            Age = 100,
                            AnotherKeyProperty = new Guid("00000000-0000-0000-0000-000000000000"),
                            IsRegularStudent = false,
                            Name = "TEST Name"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
