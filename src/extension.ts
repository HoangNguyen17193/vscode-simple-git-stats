import * as vscode from "vscode";
import Controller from './controllers/mainController';

export function activate(context: vscode.ExtensionContext) {
  const controller = new Controller(context);
  let disposable = vscode.commands.registerCommand("GitStats.viewCommits",() => {
    controller.showCommitsPanel();
  }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
