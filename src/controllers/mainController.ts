import * as vscode from 'vscode';
import CommitsPanel from '../views/commits-panel/CommitsPanel';
import CommitService from '../services/Commit';
import ConfigurationService from '../services/Configuration';
import { isBlank } from '../utils';

export default class {
  public async showCommitsPanel() {
    if(isBlank(vscode.workspace.rootPath)) {
      vscode.window.showInformationMessage('open a workspace first');
    }
    const config = ConfigurationService.getCommitChartConfiguration();
    const comitsPerAuthor = await CommitService.getAllPerAuthor(vscode.workspace.rootPath || "");
    CommitsPanel.createOrShow(comitsPerAuthor, config);
  }
}