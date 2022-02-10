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

const handleGetAllTasks = (req, res) => getTasks()
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


const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/tasks') {
    handleCreateTask(req, res);
  } else if (req.method === 'GET' && req.url === '/tasks') {
    handleGetAllTasks(req, res);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end();
  }
});

server.listen(8080);
