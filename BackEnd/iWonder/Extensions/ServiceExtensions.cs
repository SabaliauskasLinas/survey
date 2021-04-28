using Contracts;
using Entities;
using iWonder.Helpers;
using iWonder.Services;
using Logger;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iWonder.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });
        }

        public static void ConfigureIISIntegration(this IServiceCollection services)
        {
            services.Configure<IISOptions>(options =>
            {

            });
        }

        public static void ConfigureSqlServerContext(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<RepositoryContext>(opts =>
                opts.UseSqlServer(config.GetConnectionString("sqlConnection"),
                options => options.MigrationsAssembly("iWonder")));
        }

        public static void ConfigureDependencyInjections(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
            services.AddSingleton<ILoggerManager, LoggerManager>();
            services.AddScoped<IUserService, UserService>();
        }

        public static void ConfigureAppSettings(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<AppSettings>(config.GetSection("AppSettings"));
        }
    }
}
