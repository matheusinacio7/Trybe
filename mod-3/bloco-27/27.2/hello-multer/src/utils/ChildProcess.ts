import cp from 'child_process';
import type { SpawnOptions } from 'child_process';

export default class ChildProcess {
  runningProcess : cp.ChildProcess;
  execution : Promise<void>;

  constructor(command: string, args?: string[], options?: SpawnOptions) {
    this.runningProcess = cp.spawn(command, args || [], options || {});

    Object.defineProperty(this, 'execution', { get: function() {
      return new Promise<void>((resolve, reject) => {
        this.runningProcess.on('exit', (code: number) => {
          if (code !== 0) return reject(code);

          resolve();
        })
      });
    }});
  }
}

