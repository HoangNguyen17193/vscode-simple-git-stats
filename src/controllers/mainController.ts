import * as vscode from 'vscode';
import CommitsPanel from '../views/commits-panel/CommitsPanel';
import CommitService from '../services/Commit';
import ConfigurationService from '../services/Configuration';
import OutputService from '../services/Output';
import { isBlank } from '../utils';

export default class {
  public async showCommitsPanel() {
    if(isBlank(vscode.workspace.rootPath)) {
      vscode.window.showInformationMessage('Please open a workspace');
      return;
    }
    const config = ConfigurationService.getCommitChartConfiguration();
    try {
      const comitsPerAuthor = await CommitService.getAllPerAuthor(vscode.workspace.rootPath || "");
      CommitsPanel.createOrShow(comitsPerAuthor, config);
    } catch(error) {
      OutputService.printLine(error);
    }
    
  }
}