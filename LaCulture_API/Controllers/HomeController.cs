using Microsoft.AspNetCore.Mvc;

namespace LaCulture.API.Controllers
{
    [ApiController]
    [Route("home")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetHome()
        {
            return Ok(new { message = "Welcome to the LaCulture API homepage!" });
        }
    }
}
