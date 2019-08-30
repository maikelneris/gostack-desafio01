const express = require("express");

const server = express();

server.use(express.json());

const projects = [
  {
    id: "16",
    title: "Projeto Teste",
    tasks: []
  }
];

let requests = 0;

//MIDDLEWARES
function checkProjectExists(req, res, next) {
  const { id } = req.params;

  project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not found." });
  }
  return next();
}

function countRequisitions(req, res, next) {
  requests++;

  console.log(`Requisições: ${requests}`);

  return next();
}

server.use(countRequisitions);

//LISTAR TODOS OS PROJETOS
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//ADICIONAR PROJETO
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project);

  return res.json(projects);
});

//ALTERAR TITULO DO PROJETO
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projectindex = projects.findIndex(p => p.id == id);

  projects[projectindex].title = title;

  return res.json(projects);
});

//DELETAR PROJETO
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectindex = projects.findIndex(p => p.id == id);

  projects.splice(projectindex, 1);

  return res.send();
});

//ADICIONAR TAREFA
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(projects);
});

server.listen(3300);
