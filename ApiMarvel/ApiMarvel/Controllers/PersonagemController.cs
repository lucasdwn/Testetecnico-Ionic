using ApiMarvel.Data;
using ApiMarvel.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public ActionResult<IEnumerable<Personagem>> Get()
        {
            var personagens = _context.Personagens.ToList();

            if(personagens is null)
                return NotFound();

            return Ok(personagens);
        }

        [HttpGet("{id:int}", Name ="ObterPersonagem")]
        public ActionResult<Personagem> Get(int id)
        {
            var personagem = _context.Personagens.FirstOrDefault(p => p.Id == id);

            if (personagem is null)
                NotFound("Personagem não encontrado");

            return Ok(personagem);
        }

        [HttpPost]
        public ActionResult Post(Personagem personagem)
        {
            if (personagem is null)
                return BadRequest();

            _context.Personagens.Add(personagem);
            _context.SaveChanges();

            return new CreatedAtRouteResult("ObterPersonagem",
                new { id = personagem.Id }, personagem);
        }

        [HttpPut("{id:int}")]
        public ActionResult Put(int id, Personagem personagem)
        {
            if(id != personagem.Id)
            {
                return BadRequest();
            }

            _context.Update(personagem);
            _context.SaveChanges();
            return Ok(personagem);
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            var personagem = _context.Personagens.FirstOrDefault(p => p.Id == id);

            if (personagem is null)
                return NotFound("Personagem não localizado");

            _context.Personagens.Remove(personagem);
            _context.SaveChanges();

            return Ok("Personagem Excluido com sucesso");
        }
    }
}
