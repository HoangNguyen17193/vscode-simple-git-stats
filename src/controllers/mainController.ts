import * as vscode from 'vscode';
import CommitsPanel from '../views/commits-panel/CommitsPanel';
import CommitService from '../services/Commit';
import { isBlank } from '../utils';

export default class {
  public async showCommitsPanel() {
    if(isBlank(vscode.workspace.rootPath)) {
      vscode.window.showInformationMessage('open a workspace first');
    }
    const comitsPerAuthor = await CommitService.getAllPerAuthor(vscode.workspace.rootPath || "");
    CommitsPanel.createOrShow(comitsPerAuthor);
  }
}