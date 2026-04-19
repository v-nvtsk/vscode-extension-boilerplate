# VS Code Extension Boilerplate

A professional starter template for building VS Code extensions. This boilerplate includes common contribution points and API usage examples to kickstart your development.

## Features

- **Command Palette Integration**: Sample commands accessible via `Ctrl+Shift+P`.
- **Activity Bar & Sidebar**: Custom icon in the Activity Bar with a TreeView in the Sidebar.
- **Settings Page**: Full-featured configuration section in VS Code settings.
- **Context Menus**: Folder-specific actions in the File Explorer.
- **Webview API**: Example of a custom HTML-based interface.
- **File System API**: Background jobs with progress indicators for file operations.
- **Status Bar Item**: Real-time status indication in the bottom bar.

## Extension Settings

This extension contributes the following settings:

* `extension.enableFeature`: Enable/disable the core functionality.
- `extension.sampleString`: A configurable string parameter.

## Commands

- `Boilerplate: Hello World`: Shows a simple notification.
- `Boilerplate: Open Webview Panel`: Opens a custom HTML tab.
- `Boilerplate: Run Background File Job`: Simulates a file processing task with a progress bar (available in folder context menus).

## Development

1. Run `npm install` to install dependencies.
2. Press `F5` to start a new VS Code window with the extension loaded.
3. Edit `src/extension.ts` to add your logic.
4. Use `npm run watch` for automatic recompilation.

## License

MIT
