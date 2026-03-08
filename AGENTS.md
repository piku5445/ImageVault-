# Repository Guidelines

## Project Structure
This repo is split into a Vite/React client and an Express server.
- `client/` contains the frontend (`src/`, `public/`, `index.html`, `vite.config.js`).
- `client/src/components/` holds React components and local styles.
- `server/` contains the API (`index.js`, `controllers/`, `models/`, `middlewares/`, `Routes/`).
- `server/uploads/` stores uploaded files at runtime.
- `server/config/`, `server/helpers/`, `server/database/` keep configuration and supporting modules.

## Build, Test, and Development Commands
Run commands from the repo root unless noted.
- `cd client; npm install` installs frontend dependencies.
- `cd client; npm run dev` starts the Vite dev server.
- `cd client; npm run build` creates a production build.
- `cd client; npm run lint` runs ESLint.
- `cd client; npm run preview` serves the production build locally.
- `cd server; npm install` installs backend dependencies.
- `cd server; npm run dev` starts the API with `nodemon`.
- `cd server; npm start` runs `node index.js`.

## Coding Style & Naming Conventions
- Client is React with JSX. Use ESLint (`npm run lint`) before submitting.
- Keep components in `client/src/components/` and follow existing file naming when editing nearby code.
- Prefer camelCase for variables/functions and PascalCase for React components.
- Server code is plain Node.js/Express; keep route files in `server/Routes/` and match existing naming patterns.

## Testing Guidelines
- No automated test framework is configured. The server `test` script is a placeholder.
- If you add tests, document the framework and update `package.json` scripts accordingly.

## Commit & Pull Request Guidelines
- Recent commits are short, imperative messages like “Add …” or “Update …”.
- Keep commits focused and descriptive of the change.
- PRs should include a clear summary, any relevant screenshots for UI changes, and note API impacts.

## Security & Configuration
- Environment variables live in `server/.env` (and `client/src/.env` when needed).
- Do not commit real secrets; use local values for development and document new variables.
