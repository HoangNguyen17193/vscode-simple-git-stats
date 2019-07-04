import * as vscode from "vscode";
import HistoryService from "./services/history";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("extension.helloWorld",() => {
      HistoryService.getAllCommits(vscode.workspace.rootPath || "")
        .then((commits: any) => {
          console.log(commits);
        }
      );
    }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
