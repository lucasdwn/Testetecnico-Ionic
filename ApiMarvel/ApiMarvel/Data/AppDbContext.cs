using ApiMarvel.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiMarvel.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Personagem> Personagens { get; set; }
    }
}
