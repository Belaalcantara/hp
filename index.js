const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 4000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "hogwarts",
  password: "ds564",
  port: "7007  ",
});

app.use(express.json());


app.post('/bruxos', async (req, res) => {
  const { nome, idade, casa, habilidade, sangue } = req.body;
  const query = 'INSERT INTO bruxos (nome, idade, casa, habilidade, sangue) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [nome, idade, casa, habilidade, sangue];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar bruxo:', error);
    res.status(500).send('Erro ao criar bruxo');
  }
})



app.get("/bruxos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query("SELECT * FROM bruxos WHERE id = $1", [
      id,
    ]);
    if (resultado.rowCount === 0) {
      return res.status(404).send({
        status: "error",
        mensagem: `Bruxo com id ${id} não encontrado`,
        quantidade: resultado.rowCount,
        bruxos: resultado.rows,
      });
    }

    res.json({
      status: "sucesso",
      mensagem: "Bruxo encontrado",
      bruxo: resultado.rows[0],
    });
  } catch (error) {
    console.error("Erro ao buscar bruxo", error);
  }
});

app.get("/bruxos", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM bruxos");
    res.json({
      status: "sucesso",
      bruxos:resultado.rows,
    });
  } catch (error) {
    console.error("ERRO AO BUSCAR BRUXOS", error)
  }
});

app.put('/bruxos/:id', async (req, res) => {
  const id = req.params.id;
  const { nome, idade, casa, habilidade, sangue } = req.body;
  const query = 'UPDATE bruxos SET nome=$1, idade=$2, casa=$3, habilidade=$4, sangue=$5 WHERE id=$6';
  const values = [nome, idade, casa, habilidade, sangue, id];

  try {
    await pool.query(query, values);
    res.send('Bruxo atualizado com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar bruxo:', error);
    res.status(500).send('Erro ao atualizar bruxo');
  }
});

app.delete('/bruxos/:id', async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM bruxos WHERE id=$1';

  try {
    await pool.query(query, [id]);
    res.send('Bruxo deletado com sucesso');
  } catch (error) {
    console.error('Erro ao deletar bruxo:', error);
    res.status(500).send('Erro ao deletar bruxo aaaa');
  }
});

app.post('/varinhas', async (req, res) => {
  const { material, tamanho, nucleo, data_fab } = req.body;
  const query = 'INSERT INTO varinhas (material, tamanho, nucleo, data_fab) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [material, tamanho, nucleo, data_fab];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar varinha:', error);
    res.status(500).send('Erro ao criar varinha');
  }
});

app.get('/varinhas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM varinhas');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao obter varinhas:', error);
    res.status(500).send('Erro ao obter varinhas');
  }
});

app.put('/varinhas/:id', async (req, res) => {
  const id = req.params.id;
  const { material, tamanho, nucleo, data_fab } = req.body;
  const query = 'UPDATE varinhas SET material=$1, tamanho=$2, nucleo=$3, data_fab=$4 WHERE id=$5';
  const values = [material, tamanho, nucleo, data_fab, id];

  try {
    await pool.query(query, values);
    res.send('Varinha atualizada com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar varinha:', error);
    res.status(500).send('Erro ao atualizar varinha');
  }
});

app.delete('/varinhas/:id', async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM varinhas WHERE id=$1';

  try {
    await pool.query(query, [id]);
    res.send('Varinha deletada com sucesso');
  } catch (error) {
    console.error('Erro ao deletar varinha:', error);
    res.status(500).send('Erro ao deletar varinha');
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}🧙🪄✨`);
});












