using ElectronicWasteAPI.EF;
using ElectronicWasteAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;

namespace ElectronicWasteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly DataContext _context;
        SqlConnection conn;
        public DashboardController(DataContext dataContext)
        {
            _context = dataContext;
            conn = new SqlConnection(_context.Database.GetConnectionString());
        }

        [Route("GetRequestStats")]
        [HttpGet]
        public JsonResult GetRequestStats()
        {

            DataTable dt = new DataTable();
            string sqls = @"SELECT 
                            MONTH(SubmissionDate) AS MonthNumber, 
                            COUNT(*) AS RequestsCount
                            FROM vw_SellRequests
                            WHERE YEAR(SubmissionDate) = YEAR(GETDATE())
                            GROUP BY MONTH(SubmissionDate)";

            if (conn.State == ConnectionState.Closed) conn.Open();
            SqlDataAdapter da = new SqlDataAdapter(sqls, conn);
            da.Fill(dt);
            if (conn.State == ConnectionState.Open) conn.Close();
              var finalResult =Enumerable.Range(1, 12).Select(i => {
              var row = dt.AsEnumerable().FirstOrDefault(r => Convert.ToInt32(r["MonthNumber"]) == i);

                return new
                {
                    MonthName = CultureInfo.GetCultureInfo("en-US").DateTimeFormat.GetMonthName(i),
                    RequestsCount = row != null ? Convert.ToInt32(row["RequestsCount"]) : 0,
                    MonthNumber = i
                };
            }).ToList();
            return new JsonResult(finalResult);
        }


        [Route("GetUsersCount")]
        [HttpGet]
        public IActionResult GetUsersCount()
        {
            int count = 0;
            DataTable dt = new DataTable();
            string sqlu = "select * from Users";
            SqlDataAdapter da = new SqlDataAdapter(sqlu, conn);
            da.Fill(dt);
            if(dt.Rows.Count > 0)
            {
                count = dt.Rows.Count;
            }
            else
            {
                count=0;
            }
            return Ok(count);


        }

        [Route("PendingOrdersCount")]
        [HttpGet]
        public IActionResult PendingOrdersCount()
        {
            int count = 0;
            DataTable dt = new DataTable();
            string sqlu = "select * from SellRequests where RequestStatus=0";
            SqlDataAdapter da = new SqlDataAdapter(sqlu, conn);
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                count = dt.Rows.Count;
            }
            else
            {
                count = 0;
            }
            return Ok(count);


        } 

        [Route("GetTotalPoints")]
        [HttpGet]
        public IActionResult GetTotalPoints()
        {
            int totalPoints = 0;
            DataTable dt = new DataTable();
            string sql = "select ISNULL(SUM(Points), 0) from Users";
            using (SqlCommand cmd = new SqlCommand(sql, conn))
            {
                if (conn.State == ConnectionState.Closed) conn.Open();
                var result = cmd.ExecuteScalar();
                totalPoints = Convert.ToInt32(result);

                if (conn.State == ConnectionState.Open) conn.Close();
            }
            return Ok(totalPoints);

        }

        [Route("AllOrdersCount")]
        [HttpGet]
        public IActionResult AllOrdersCount()
        {
            int count = 0;
            DataTable dt = new DataTable();
            string sqlu = "select * from Orders";
            SqlDataAdapter da = new SqlDataAdapter(sqlu, conn);
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                count = dt.Rows.Count;
            }
            else
            {
                count = 0;
            }
            return Ok(count);


        }

        [Route("GetCategoryStats")]
        [HttpGet]
        public IActionResult GetCategoryStats()
        {
            DataTable dt = new DataTable();
            string sql = @"SELECT CategoryName, COUNT(CategoryID) AS CategoryCount FROM vw_cartproducts
                           GROUP BY CategoryName";

            if (conn.State == ConnectionState.Closed) conn.Open();
            SqlDataAdapter da = new SqlDataAdapter(sql, conn);
            da.Fill(dt);
            if (conn.State == ConnectionState.Open) conn.Close();

            var result = dt.AsEnumerable().Select(row => new
            {
                Name = row["CategoryName"].ToString(),
                Count = Convert.ToInt32(row["CategoryCount"])
            }).ToList();

            return Ok(result);
        }
       
    }
}
