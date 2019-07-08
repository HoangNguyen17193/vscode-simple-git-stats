const  { exec, spawnSync } = require("child_process");

// const authorEmail = '%ae';
// const date = '%aI';
// const body = '%b';
// const format = {date, body, email: authorEmail};
// const cmd = `git -C ${dir} log --pretty=format:'${JSON.stringify(format)},'`;

export default class {
  static getAllCommitsPerAuthor(dir:string) {
    const cmd = `git -C ${dir} shortlog -sn -e --all`;
    return new Promise((resolve, reject) => {
      exec(cmd, { maxBuffer: 1024 * 50 * 1000 },  (err: any, stdout: any, stderr: any) => {
        if (err) {
          return reject(err);
        }
        if (stderr) {
          return reject(stderr);
        }
        const lines = stdout.split(/\n/g).slice(0, -1);
        const commitsPerAuthors = lines.map((line:any) => {
          const data = line.split('\t');
          return {
            totalCommits: data[0].trim(),
            author: data[1].trim() 
          };
        });
        return resolve(commitsPerAuthors);
      });
    });
  }
}