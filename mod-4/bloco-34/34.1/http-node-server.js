const http = require('http');
const fs = require('fs').promises;

const saveTasks = (tasks) => fs.writeFile('./tasks.json', JSON.stringify(tasks));

const getTasks = () => fs.readFile('./tasks.json', 'utf-8')
  .then((content) => JSON.parse(content))
  .catch(() => []);

const readIncomingJson = (req) => new Promise((resolve) => {
  let chunks = '';

  req.on('data', (chunk) => chunks += chunk);

  req.on('end', () => {
    resolve(JSON.parse(chunks));
  });
});

const sendResponse = (res, message) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(message));
}

const handleGetAllTasks = (_req, res) => getTasks()
  .then((tasks) => {
    res.statusCode = 200;
    sendResponse(res, { tasks });
});

const handleCreateTask = (req, res) => {
  return Promise.all([getTasks(), readIncomingJson(req)])
    .then(([tasks, incomingTask]) => {
      tasks.push(incomingTask);
      return saveTasks(tasks);
    })
    .then(() => {
      res.statusCode = 201;
      sendResponse(res, { message: 'Task created successfully' })
    });
};

const handleNotFound = (_req, res) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end();
}

const server = http.createServer((req, res) => {
  const handlerMap = new Map([
    ['POST /tasks', handleCreateTask],
    ['GET /tasks', handleGetAllTasks],
  ]);

  const rest = `${req.method} ${req.url}`;

  const handler = handlerMap.has(rest) ? handlerMap.get(rest) : handleNotFound;
  handler(req, res);
});

server.listen(8080);
