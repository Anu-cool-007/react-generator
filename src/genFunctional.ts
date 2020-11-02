import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const jsData = (componentName: string, capitalizedName: string) => `import classes from '${capitalizedName}.module.css'

const ${componentName} = (props) => {
	return (
		<div className={classes.${capitalizedName}}>
			${capitalizedName} component works!
		</div>
	)
};

export default ${componentName}
`;

const cssData = (capitalizedName: string) => `.${capitalizedName} {
	
}
`;

export function generateFunctionalComponent(filePath: string, componentName: string) {
	const capitalizedName = componentName[0].toUpperCase() + componentName.substr(1);
	const completePath = path.join(filePath, capitalizedName);

	fs.mkdir(completePath, { recursive: true }, (err) => {
		if (err) {
			console.error(err);
			return vscode.window.showErrorMessage("Failed to create component folder");
		} else {
			fs.writeFile(path.join(completePath, capitalizedName + '.js'), jsData(componentName, capitalizedName), err => {
				if (err) {
					console.error(err);
					return vscode.window.showErrorMessage("Failed to create component js file");
				}
			});
			fs.writeFile(path.join(filePath, capitalizedName, capitalizedName + '.module.css'), cssData(capitalizedName), err => {
				if (err) {
					console.error(err);
					return vscode.window.showErrorMessage("Failed to create component css file");
				}
			});
		}
	});
	vscode.window.showInformationMessage("Created functional component: " + componentName);

}