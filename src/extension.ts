import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { files } from './files';

const { page, components } = files('index');


function wxFilesCommandHander(type: string, e: vscode.Uri) {
    const stat = fs.statSync(e.fsPath);
    const dir = path.normalize(e.fsPath); // 处理window路径 http://nodejs.cn/api/path.html#path_path_normalize_path
    if (stat.isDirectory()) {
        try {
            const cssType = vscode.workspace.getConfiguration('wxFiles').get<string>('cssType', '');
            const fileTypes: Array<string> = ['js', cssType, 'wxml', 'json'];
            fileTypes.map(async (i: string) => {
                const data = new Uint8Array(Buffer.from(type === 'page' ? page[i] : components[i]));
                const defaultName = vscode.workspace.getConfiguration('wxFiles').get<boolean>('defaultName', true);
                const fileName = defaultName ? 'index' : path.parse(e.fsPath).name;
                fs.writeFileSync(`${dir}/${fileName}.${i}`, data);
            });
            vscode.window.showInformationMessage(`create ${type} files success!`);
        } catch (error) {
            vscode.window.showErrorMessage('create page files failed');
        }
    } else {
        vscode.window.showErrorMessage('please choose a folder');
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "wxFiles" is now active!');
    let disposable = vscode.commands.registerCommand('extension.pageFiles', async (e: vscode.Uri) => {
        wxFilesCommandHander('page', e);
    });

    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('extension.componentsFiles', (e: vscode.Uri) => {
        wxFilesCommandHander('components', e);
    });
    context.subscriptions.push(disposable);
}

export function deactivate() {}
