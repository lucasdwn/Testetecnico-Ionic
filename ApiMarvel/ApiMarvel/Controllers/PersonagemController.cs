using ApiMarvel.Data;
using ApiMarvel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiMarvel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonagemController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PersonagemController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public  async Task<ActionResult<IEnumerable<Personagem>>> Get()
        {
            var personagens = await _context.Personagens.ToListAsync();

            if(personagens is null)
                return NotFound();

            return Ok(personagens);
        }

        [HttpGet("{id:int}", Name ="ObterPersonagem")]
        public async Task<ActionResult<Personagem>> Get(int id)
        {
            var personagem = await _context.Personagens.FirstOrDefaultAsync(p => p.Id == id);

            if (personagem is null)
                NotFound("Personagem não encontrado");

            return Ok(personagem);
        }

        [HttpPost]
        public async Task<ActionResult> Post(Personagem personagem)
        {
            if (personagem is null)
                return BadRequest();

            await _context.Personagens.AddAsync(personagem);
            await _context.SaveChangesAsync();

            return new CreatedAtRouteResult("ObterPersonagem",
                new { id = personagem.Id }, personagem);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, Personagem personagem)
        {
            if(id != personagem.Id)
            {
                return BadRequest();
            }

            _context.Update(personagem);
            await _context.SaveChangesAsync();
            return Ok(personagem);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var personagem =  await _context.Personagens.FirstOrDefaultAsync(p => p.Id == id);

            if (personagem is null)
                return NotFound("Personagem não localizado");

            _context.Personagens.Remove(personagem);
            await _context.SaveChangesAsync();

            return Ok("Personagem Excluido com sucesso");
        }
    }
}
