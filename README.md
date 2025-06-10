# Modding Tools

A collection of web-based tools to assist with modding PlayStation 2 games, focused on file manipulation for titles such as God Hand and Resident Evil 4.

This project is built with [Next.js](https://nextjs.org) and uses modern technologies like React, TailwindCSS, and Jotai for state management.

---

## Features

### BIN-DAT Tool

- **Extract**: Upload `.BIN` or `.DAT` files to extract their contents into a ZIP archive. Each contained file is unpacked and named according to its header, with a manifest file generated.
- **Repack**: Use a manifest file and files to repackage them into a `.BIN` or `.DAT` archive for use in your game.

### MSD Tool

- **Extract**: Convert binary `.MSD` files (used in God Hand) into a readable and editable text format.
- **Repack**: Convert edited text back into the binary `.MSD` format for use in the game.

---

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn install
yarn dev
# or
pnpm install
pnpm dev
# or
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the tools.

You can start editing the main page by modifying `app/page.tsx`. The project auto-updates as you edit files.

---

## Usage

### BIN-DAT Tool

1. **Extract Mode**
   - Go to `/bin-dat-tool`
   - Upload a `.BIN` or `.DAT` file.
   - Click "Ekstrak ke .zip" to extract and download a ZIP archive with all files and a manifest.

2. **Repack Mode**
   - Switch to "Repack Mode".
   - Upload the manifest file (`.txt`) and the files to be repacked.
   - Use the UI to generate a repacked `.BIN` or `.DAT` file.

### MSD Tool

1. **Extract**
   - Go to `/msd-tool`
   - Upload a `.MSD` file.
   - The tool will convert and display the content as text for editing.

2. **Repack**
   - After editing, use the "Repack" feature to generate a new `.MSD` file.

---

## License

MIT
