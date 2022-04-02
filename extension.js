const vscode = require('vscode');

/**
* @param {vscode.ExtensionContext} context
*/

function activate(context) {

	let uriFolder = vscode.workspace.workspaceFolders[0].uri.path;

	function sendTextToTerminal(result, command) {
		let path = result[0].path;
		let pureUri = path.replace(uriFolder, '.')
		vscode.window.activeTerminal.sendText('python ' + pureUri + ' ' + command)
	}

	let runserver = vscode.commands.registerCommand('django-command-shortcuts.runserver', function () {

		if (vscode.window.activeTerminal) {
			vscode.workspace.findFiles('*/manage.py', uriFolder).then(function (result) {
				sendTextToTerminal(result, 'runserver');
			})
		}
	});

	let makemigrations = vscode.commands.registerCommand('django-command-shortcuts.makemigrations', function () {
		if (vscode.window.activeTerminal) {
			vscode.workspace.findFiles('*/manage.py', uriFolder).then(function (result) {
				sendTextToTerminal(result, 'makemigrations');
			});
		}
	});

	let migrate = vscode.commands.registerCommand('django-command-shortcuts.migrate', function () {
		if (vscode.window.activeTerminal) {
			vscode.workspace.findFiles('*/manage.py', uriFolder).then(function (result) {
				sendTextToTerminal(result, 'migrate');
			});
		}
	});

	let env = vscode.commands.registerCommand('django-command-shortcuts.env', function () {
		if (vscode.window.activeTerminal) {
			vscode.workspace.findFiles('*/Activate.ps1', uriFolder).then(function (result) {
				let path = result[0].path;
				let pureUri = path.replace(uriFolder, '.')
				vscode.window.activeTerminal.sendText(pureUri)
			});
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