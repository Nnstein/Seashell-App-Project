using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Seashell.Resort.MultiTenancy.HostDashboard.Dto;

namespace Seashell.Resort.MultiTenancy.HostDashboard
{
    public interface IIncomeStatisticsService
    {
        Task<List<IncomeStastistic>> GetIncomeStatisticsData(DateTime startDate, DateTime endDate,
            ChartDateInterval dateInterval);
    }
}