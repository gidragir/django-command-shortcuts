const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let runserver = vscode.commands.registerCommand('django-command-shortcuts.runserver', function () {
		if (vscode.window.activeTerminal) {
			vscode.window.activeTerminal.sendText('python ./taskmanager/manage.py runserver')	
		}
	});

	let makemigrations = vscode.commands.registerCommand('django-command-shortcuts.makemigrations', function () {
		if (vscode.window.activeTerminal) {
			vscode.window.activeTerminal.sendText('python ./taskmanager/manage.py makemigrations')	
		}
	});

	let migrate = vscode.commands.registerCommand('django-command-shortcuts.migrate', function () {
		if (vscode.window.activeTerminal) {
			vscode.window.activeTerminal.sendText('python ./taskmanager/manage.py migrate')	
		}
	});

	let env = vscode.commands.registerCommand('django-command-shortcuts.env', function () {
		if (vscode.window.activeTerminal) {
			vscode.window.activeTerminal.sendText('./env/Scripts/Activate.ps1')	
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
