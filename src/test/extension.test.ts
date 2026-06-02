import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension', () => {
    test('extension should be present', () => {
        assert.ok(vscode.extensions.getExtension('PrakashSewani.class-spy'));
    });

    test('should activate', async () => {
        const ext = vscode.extensions.getExtension('PrakashSewani.class-spy');
        assert.ok(ext);
        await ext!.activate();
        assert.strictEqual(ext!.isActive, true);
    });

    test('should register commands', async () => {
        const commands = await vscode.commands.getCommands(true);
        assert.ok(commands.includes('classSpy.openFile'));
        assert.ok(commands.includes('classSpy.editStyle'));
        assert.ok(commands.includes('classSpy.refreshIndex'));
        assert.ok(commands.includes('classSpy.showUsages'));
    });
});
