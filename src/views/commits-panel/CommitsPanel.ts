import * as vscode from 'vscode';

export default class CommitsPanel {
  public static currentPanel: CommitsPanel | undefined;

  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(comitsPerAuthor: any) {
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
    if (CommitsPanel.currentPanel) {
      CommitsPanel.currentPanel._panel.reveal(column);
      return;
    }

    const panel = vscode.window.createWebviewPanel("CommitsPanel", "CommitsPerAuthor", column || vscode.ViewColumn.One,
      {
        enableScripts: true
      }
    );

    CommitsPanel.currentPanel = new CommitsPanel(panel, comitsPerAuthor);
  }

  private constructor(panel: vscode.WebviewPanel, comitsPerAuthor:any) {
    this._panel = panel;
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel = panel;
    const webViewContent = this.getWebviewContent(comitsPerAuthor);
    this._panel.webview.html = webViewContent;
  }

  private getWebviewContent(comitsPerAuthor: any | []) {
    const labels = comitsPerAuthor.map((commit:any) => `'${commit.author}'`).join(', ');
    const data = (comitsPerAuthor.map((commit:any) => commit.totalCommits)).toString();
    return `<!DOCTYPE html>
          <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Signin</title>
            </head>
            <body>
              <canvas id="myChart"></canvas>
              <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
              <script>
                const vscode = acquireVsCodeApi();
                (function init() {
                  document.vscode = vscode;
                })();
              </script>
              <script>
                var ctx = document.getElementById('myChart');
                var chart = new Chart(ctx, {
                  type: 'pie',
                  data: {
                    labels: [${labels}],
                    datasets: [{
                        data: [${data}],
                        backgroundColor: ['#00bcd4', '#ffa0d2', '#ffa726', '#00bfa5', '#03a9f4', '#1976d2', '#c1c1c1', '#127ffc']
                    }]
                  },
                  options: {
                    maintainAspectRatio: true
                  }
                });
              </script>
            </body>
            <style>
              .container {
                padding-left: 20px;
              }
              .header {
                margin-top: 20px;
                margin-bottom: 20px;
                color: #AAAEB3;
                font-size: 14px;
                font-weight: normal;
              }
              .block {
                margin-bottom: 20px;
              }
              .username, .password {
                background-color: rgba(194,199,203,0.2); 
                border-radius: 24px; 
                height: 38px; 
                width: 300px; 
                border:none; 
                font-size: 16px;
                padding-left: 20px
              }
              input:focus
                border:none;
              }
              .input-label {
                font-size: 14px;
                display: inline;
                margin-bottom 10px;
                color: #98A5B3;
              }
              .btn {
                box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
                border-radius: 20px;
                width: 120px;
                height: 40px;
                font-size: 14px;
                font-weight: 500;
                border:none;
                cursor: pointer
              }
              .footer {
                margin-top: 20px;
              }
              .btn-signin {
                background-color: #00A9FF;
                color: #FFFFFF;
              }
              .btn-signup {
                background-color: #E6E6E6;
                color: #98A5B3;
                margin-left: 15px;
              }
              .signup-link {
                color: #00A9FF;
                font-size: 14px;
                font-weight: 500;
                margin-left: 15px;
                text-decoration: none;
              }
              body.vscode-light .username, body.vscode-light .password {
                color: #616466;
              }
              body.vscode-dark .username, body.vscode-dark .password {
                color: #C2C7CC;
              }
            </style>
          </html>`;
  }
  
    public dispose() {
      CommitsPanel.currentPanel = undefined;
      // Clean up our resources
      this._panel.dispose();
  
      while (this._disposables.length) {
        const panel = this._disposables.pop();
        if (panel) {
          panel.dispose();
        }
      }
    }
}