#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["src/Seashell.Resort.Web.Mvc/Seashell.Resort.Web.Mvc.csproj", "src/Seashell.Resort.Web.Mvc/"]
COPY ["src/Seashell.Resort.Web.Core/Seashell.Resort.Web.Core.csproj", "src/Seashell.Resort.Web.Core/"]
COPY ["src/Seashell.Resort.Application/Seashell.Resort.Application.csproj", "src/Seashell.Resort.Application/"]
COPY ["src/Seashell.Resort.Application.Shared/Seashell.Resort.Application.Shared.csproj", "src/Seashell.Resort.Application.Shared/"]
COPY ["src/Seashell.Resort.Core.Shared/Seashell.Resort.Core.Shared.csproj", "src/Seashell.Resort.Core.Shared/"]
COPY ["src/Seashell.Resort.Core/Seashell.Resort.Core.csproj", "src/Seashell.Resort.Core/"]
COPY ["src/Seashell.Resort.EntityFrameworkCore/Seashell.Resort.EntityFrameworkCore.csproj", "src/Seashell.Resort.EntityFrameworkCore/"]
COPY ["src/Seashell.Resort.GraphQL/Seashell.Resort.GraphQL.csproj", "src/Seashell.Resort.GraphQL/"]
RUN dotnet restore "src/Seashell.Resort.Web.Mvc/Seashell.Resort.Web.Mvc.csproj"
COPY . .
WORKDIR "/src/src/Seashell.Resort.Web.Mvc"
RUN dotnet build "Seashell.Resort.Web.Mvc.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Seashell.Resort.Web.Mvc.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Seashell.Resort.Web.Mvc.dll"]
