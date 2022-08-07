using ApiMarvel.Data;
using ApiMarvel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiMarvel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoriaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("personagens")]
        public async Task<ActionResult<IEnumerable<Categoria>>> GetCategoriasPersonagens()
        {
            return await _context.Categorias.Include(p => p.Personagens).ToListAsync();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categoria>>> Get()
        {
            return  await _context.Categorias.AsNoTracking().ToListAsync();
        }

        [HttpGet("{id:int}", Name = "ObterCategoria")]
        public async Task<ActionResult<Categoria>> Get(int id)
        {
            var categoria =  await _context.Categorias.FirstOrDefaultAsync(p => p.Id == id);


            if (categoria == null)
            {
                return NotFound("Categoria não encontrada...");
            }

            await _context.Categorias.Include(p => p.Personagens).ToListAsync();

            return Ok(categoria);
        }

        [HttpPost]
        public async Task<ActionResult> Post(Categoria categoria)
        {
            if (categoria is null)
                return BadRequest();

            await _context.Categorias.AddAsync(categoria);
            await _context.SaveChangesAsync();

            return new CreatedAtRouteResult("ObterCategoria",
                new { id = categoria.Id }, categoria);

        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, Categoria categoria)
        {
            if(id != categoria.Id)
            {
                return BadRequest();
            }

             _context.Update(categoria);
            await _context.SaveChangesAsync();
            return Ok(categoria);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var categoria = await _context.Categorias.FirstOrDefaultAsync(c => c.Id == id);

            if(categoria == null)
            {
                return NotFound("Categoria não encontrada");
            }

            _context.Categorias.Remove(categoria);
             await _context.SaveChangesAsync();
            return Ok("Categoria Excluida com sucesso");
        }
    }
}
