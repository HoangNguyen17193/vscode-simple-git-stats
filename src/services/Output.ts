import * as vscode from 'vscode';

export default class {
  private static outputChanel:vscode.OutputChannel = vscode.window.createOutputChannel("Simple GIT Stats");
  static printLine(message:string) {
    this.outputChanel.appendLine(message);
  }
  static print(message:string) {
    this.outputChanel.append(message);
  }
}