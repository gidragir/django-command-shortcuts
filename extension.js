const vscode = require('vscode');

/**
* @param {vscode.ExtensionContext} context
*/

function activate(context) {

	function sendTextToTerminal(result, uriFolder, command) {
		let path = result[0].path;
		let pureUri = path.replace(uriFolder, '.')
		vscode.window.activeTerminal.sendText('python ' + pureUri + ' ' + command)
	}

	let uriFolder = vscode.workspace.workspaceFolders[0].uri.path;

	let runserver = vscode.commands.registerCommand('django-command-shortcuts.runserver', function () {

		if (vscode.window.activeTerminal) {
			vscode.workspace.findFiles('*/manage.py', uriFolder).then(function (result) {
				sendTextToTerminal(result, uriFolder, 'runserver');
			})
		}
	});

	let makemigrations = vscode.commands.registerCommand('django-command-shortcuts.makemigrations', function () {
		if (vscode.window.activeTerminal) {
			vscode.workspace.findFiles('*/manage.py', uriFolder).then(function (result) {
				sendTextToTerminal(result, uriFolder, 'makemigrations');
			});
		}
	});

	let migrate = vscode.commands.registerCommand('django-command-shortcuts.migrate', function () {
		if (vscode.window.activeTerminal) {
			vscode.workspace.findFiles('*/manage.py', uriFolder).then(function (result) {
				sendTextToTerminal(result, uriFolder, 'migrate');
			});
		}
	});

	let env = vscode.commands.registerCommand('django-command-shortcuts.env', function () {
		if (vscode.window.activeTerminal) {
			vscode.window.activeTerminal.sendText('./env/Scripts/Activate.ps1');
		}
	});

	context.subscriptions.push(runserver);
	context.subscriptions.push(makemigrations);
	context.subscriptions.push(migrate);
	context.subscriptions.push(env);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}