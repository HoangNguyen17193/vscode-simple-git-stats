import * as vscode from "vscode";
import Controller from './controllers/mainController';

export function activate(context: vscode.ExtensionContext) {
  const controller = new Controller();
  let disposable = vscode.commands.registerCommand("extension.helloWorld",() => {
    controller.showCommitsPanel();
  }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
