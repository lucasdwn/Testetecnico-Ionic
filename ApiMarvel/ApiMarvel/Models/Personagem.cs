using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ApiMarvel.Models
{
    public class Personagem
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Imagem { get; set; }
        public string? Descrição { get; set; }
        public int CategoriaId { get; set; }
        [JsonIgnore]
        public Categoria? Categoria { get; set; }
    }
}
