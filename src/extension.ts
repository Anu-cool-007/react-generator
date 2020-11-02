// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { generateFunctionalComponent } from './genFunctional';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "react-generator" is now active!');

	const componentNameRegex = new RegExp('/^\S+$/g');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let functionalComponentCommand = vscode.commands.registerCommand('react-generator.createFunctionalComponent', (uri: vscode.Uri) => {
		// The code you place here will be executed every time your command is executed
		vscode.window.showInputBox().then(componentName => {
			if (componentName !== undefined) {
				// Display a message box to the user
				if (/^\S+$/g.test(componentName)) {
					generateFunctionalComponent(uri.fsPath, componentName);
				} else {
					vscode.window.showErrorMessage("Invalid component name: " + componentName);
				}
			}
		});
		// vscode.window.showErrorMessage("Path: " + uri.fsPath);
	});
	let classComponentCommand = vscode.commands.registerCommand('react-generator.createClassComponent', (uri: vscode.Uri) => {
		// The code you place here will be executed every time your command is executed
		// vscode.window.showInputBox().then(componentName => {
		// 	if (componentName !== undefined) {
		// 		// Display a message box to the user
		// 		if (/^\S+$/g.test(componentName)) {
		// 			generateFunctionalComponent(uri.fsPath, componentName);
		// 		} else {
		// 			vscode.window.showErrorMessage("Invalid component name: " + componentName);
		// 		}
		// 	}
		// });
		vscode.window.showErrorMessage("Not supported 😥");
	});

	context.subscriptions.push(functionalComponentCommand, classComponentCommand);
}

// this method is called when your extension is deactivated
export function deactivate() { }
