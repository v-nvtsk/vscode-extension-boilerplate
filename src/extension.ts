import * as vscode from 'vscode';

/**
 * This method is called when your extension is activated.
 * Your extension is activated the very first time the command is executed.
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vscode-extension-boilerplate" is now active!');

    // 1. COMMAND PALETTE: Hello World
    const helloWorldCommand = vscode.commands.registerCommand('extension.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from your Extension Boilerplate!');
    });

    // 2. SETTINGS: Read and Listen for changes
    const config = vscode.workspace.getConfiguration('extension');
    console.log('Sample Setting Value:', config.get('sampleString'));

    const configListener = vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('extension.enableFeature')) {
            const newValue = vscode.workspace.getConfiguration('extension').get('enableFeature');
            vscode.window.showInformationMessage(`Feature is now: ${newValue ? 'Enabled' : 'Disabled'}`);
        }
    });

    // 3. SIDEBAR: Tree View Provider
    const treeDataProvider = new SampleTreeDataProvider();
    vscode.window.registerTreeDataProvider('boilerplate-view', treeDataProvider);

    // 4. STATUS BAR: Create and Show Item
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = `$(rocket) Boilerplate Active`;
    statusBarItem.tooltip = 'Click to see Hello World';
    statusBarItem.command = 'extension.helloWorld';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // 5. WEBVIEW PANEL: Custom HTML UI
    const webviewCommand = vscode.commands.registerCommand('extension.openWebview', () => {
        const panel = vscode.window.createWebviewPanel(
            'boilerplateWebview',
            'Boilerplate Webview',
            vscode.ViewColumn.One,
            {}
        );

        panel.webview.html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Boilerplate Webview</title>
                <style>
                    body { font-family: sans-serif; padding: 20px; color: white; background: #1e1e1e; }
                    h1 { color: #007acc; }
                </style>
            </head>
            <body>
                <h1>Hello from Webview!</h1>
                <p>This is a custom HTML interface for your extension.</p>
                <button onclick="alert('Button Clicked!')">Interact</button>
            </body>
            </html>
        `;
    });

    // 6. BACKGROUND JOB: Progress + File System API
    const backgroundJobCommand = vscode.commands.registerCommand('extension.runBackgroundJob', async (uri: vscode.Uri) => {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Processing Files",
            cancellable: true
        }, async (progress, token) => {
            token.onCancellationRequested(() => {
                console.log("User cancelled the long running operation");
            });

            progress.report({ increment: 0, message: "Starting file scan..." });
            
            // Simulate background work (e.g., generating index.ts)
            for (let i = 0; i < 5; i++) {
                if (token.isCancellationRequested) { return; }
                await new Promise(resolve => setTimeout(resolve, 1000));
                progress.report({ increment: 20, message: `Processing step ${i + 1}...` });
            }

            vscode.window.showInformationMessage(`Finished job in: ${uri ? uri.fsPath : 'Workspace'}`);
        });
    });

    // Add everything to subscriptions for cleanup
    context.subscriptions.push(
        helloWorldCommand,
        configListener,
        webviewCommand,
        backgroundJobCommand
    );
}

/**
 * Sample Tree Data Provider for the Sidebar
 */
class SampleTreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
    getTreeItem(element: TreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: TreeItem): Thenable<TreeItem[]> {
        if (!element) {
            return Promise.resolve([
                new TreeItem('Configuration', vscode.TreeItemCollapsibleState.Collapsed),
                new TreeItem('Documentation', vscode.TreeItemCollapsibleState.None, {
                    command: 'extension.helloWorld',
                    title: 'Open Help',
                    arguments: []
                })
            ]);
        }
        return Promise.resolve([
            new TreeItem('Setting A', vscode.TreeItemCollapsibleState.None),
            new TreeItem('Setting B', vscode.TreeItemCollapsibleState.None)
        ]);
    }
}

class TreeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
        this.tooltip = `${this.label} Tooltip`;
        this.description = 'Sample description';
    }
}

export function deactivate() {}
