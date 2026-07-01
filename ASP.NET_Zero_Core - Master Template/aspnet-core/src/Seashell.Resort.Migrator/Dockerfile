#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["src/Seashell.Resort.Migrator/Seashell.Resort.Migrator.csproj", "src/Seashell.Resort.Migrator/"]
COPY ["src/Seashell.Resort.EntityFrameworkCore/Seashell.Resort.EntityFrameworkCore.csproj", "src/Seashell.Resort.EntityFrameworkCore/"]
COPY ["src/Seashell.Resort.Core/Seashell.Resort.Core.csproj", "src/Seashell.Resort.Core/"]
COPY ["src/Seashell.Resort.Core.Shared/Seashell.Resort.Core.Shared.csproj", "src/Seashell.Resort.Core.Shared/"]
RUN dotnet restore "src/Seashell.Resort.Migrator/Seashell.Resort.Migrator.csproj"
COPY . .
WORKDIR "/src/src/Seashell.Resort.Migrator"
RUN dotnet build "Seashell.Resort.Migrator.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Seashell.Resort.Migrator.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Seashell.Resort.Migrator.dll", "-s"]
