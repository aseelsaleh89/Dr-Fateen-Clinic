using System.ComponentModel.DataAnnotations;

namespace MyApi.DAL.Models
{
    public class Review : BaseModel
    {
        public int Id { get; set; }


        public string UserId { get; set; } = string.Empty;

        public ApplicationUser? User { get; set; }



        [Range(1,5)]
        public int Rating { get; set; }



        public string Comment { get; set; } = string.Empty;

    }
}