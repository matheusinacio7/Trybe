import cp from 'child_process';
import { promises as fs } from 'fs';

const startServer = () => new Promise(async (resolve, reject) => {
  const { scripts } = await fs.readFile('package.json', 'utf-8')
    .then((jsonPackage) => JSON.parse(jsonPackage));
  
  const [command, ...args] = scripts.start.split(' ');
  const server = cp.spawn(command, args);
  server.stdout.on('data', (dataBuf) => {
    const message = dataBuf.toString('utf-8');
    if (message.includes('Server is up')) {
      resolve(server);
    }
  })
});

export default startServer;
