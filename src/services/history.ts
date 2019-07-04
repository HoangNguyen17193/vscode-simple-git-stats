const  { exec } = require("child_process");
const fs = require('fs');

export default class {
  static getAllCommits(dir:string) {
    const authorEmail = '%ae';
    const date = '%aI';
    const body = '%b';
    const format = {date, body, email: authorEmail};
    const cmd = `git -C ${dir} log --pretty=format:'${JSON.stringify(format)},'`;
    return new Promise((resolve, reject) => {
      exec(cmd, (err: any, stdout: any, stderr: any) => {
        if (err) {
          return reject(err);
        }
        if (stderr) {
          return reject(stderr);
        }
        stdout = stdout.replace(/\n/g, ' ');
        return resolve(JSON.parse(`[${stdout.slice(0, -1)}]`));
      });
    });
  }
}