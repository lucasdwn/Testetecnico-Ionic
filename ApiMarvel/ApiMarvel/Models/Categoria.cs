using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ApiMarvel.Models
{
    public class Categoria
    {

        public int Id { get; set; }

        [Required(ErrorMessage ="Digite o nome da categoria")]
        [StringLength(100, ErrorMessage ="O nome deve conter no maximo até 100 caracteres")]
        public string? Nome { get; set; }

        public ICollection<Personagem>? Personagens { get; set; }
    }
}
