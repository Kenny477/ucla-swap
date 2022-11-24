# UCLA Swap

A student peer-to-peer marketplace for buying, selling, and trading goods and services of all kinds.

## Getting Started

Follow these instructions to run the frontend and backend for the web application.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/): v16 or newer
  - See [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for more instructions]
  - Comes with NPM which we use to manage all our packages
- [Docker](https://docs.docker.com/get-docker/):
  - See [Get started](https://docs.docker.com/get-started/) for documentation
  - Used for backend containerization of SQL container to allow us to run SQL server on any platform (Windows, Mac, Linux)

### Frontend Development

1. Enter the frontend root directory (/client)
2. Run `npm install` to install all dependencies
3. Run `npm run dev` to start the frontend Vite dev server
4. The frontend should be running on [localhost:5173](http://localhost:5173)

### Backend Development

1. Enter the backend root directory (/server)
2. Run `npm install` to install all dependencies
3. Run `npm run dev` to start the backend NestJS server in development mode
    1. Note: This also starts the development Docker container for the SQL database.
    2. To run each part separately use:
        1. `npm run start:dev` to start the NestJS server
        2. `npm run docker:run` to start the SQL Docker container (which is an alias of `docker-compose up -f docker.compose.yml -d`).
4. The backend should be running on [localhost:4000](http://localhost:4000)

#### Useful Commands for Backend Development

- `npm run docker:sql` - Open a MySQL shell to the database. See environmental variables for MySQL password.

## Production

### Frontend Deployment

1. Enter the frontend root directory (/client)
2. Run `npm ci` to install all dependencies
3. Run `npm run build` to build the frontend
    1. Run `npm run preview` to view the static production bundle

### Backend Deployment

1. Enter the backend root directory (/server)
2. Run `npm ci` to install all dependencies
3. Run `npm run build` to build the backend
    1. You may run `npm run start:prod` to start the production backend NestJS server from the build files

## Architecture

### Frontend Tech Stack

- [React](https://reactjs.org/) - Frontend UI framework
- [Vite](https://vitejs.dev/) - Frontend build tool
- [TypeScript](https://www.typescriptlang.org/) - Frontend language
- [Tailwind CSS](https://tailwindcss.com/) - Frontend CSS framework
- [React Router](https://reactrouter.com/) - Frontend routing library

### Frontend Structure

```text
/public
|- /assets
/src
|- /components
|- /layouts
|- /pages
|- /styles
|- /routes
|- /types
|- main.tsx
```

- `/public` - All public files to be directly served by the frontend
  - `/assets` - All the static assets for the frontend
- `/src` - All the source code
  - `/components` - Reusable React components
  - `/layouts` - Reusable React layouts
  - `/pages` - All frontend pages
  - `/styles` - CSS styles
  - `/types` - Extra types
  - `main.tsx` - Entry point for the frontend that handles routing

### Backend Tech Stack

- [NestJS](https://nestjs.com/) - Backend framework
- [TypeScript](https://www.typescriptlang.org/) - Backend language
- [MySQL](https://www.mysql.com/) - Backend database
- [TypeORM](https://typeorm.io/) - Backend database ORM
- [Docker](https://www.docker.com/) - Backend containerization

### Backend Structure

```text
/src
|- /auth
|- /file
|- /listing
|- /mail
|- /user
|- app.controller.ts
|- app.module.ts
|- app.service.ts
|- main.ts
/storage
.env
docker-compose.prod.yml
docker-compose.yml
Dockerfile
```

- `/src` - All the source code
  - `/auth` - Authentication module
  - `/file` - File module
  - `/listing` - Listing module
  - `/mail` - Mail module
  - `/user` - User module
  - `app.controller.ts` - Controller for top-level endpoints
  - `app.module.ts` - Module for top-level endpoints
  - `app.service.ts` - Service for top-level endpoints
  - `main.ts` - Entry point for backend server
- `/storage` - All the files uploaded to the server
- `.env` - Environment variables
- `docker-compose.prod.yml` - Docker compose file for production
- `docker-compose.yml` - Docker compose file for development
- `Dockerfile` - Dockerfile for production build

## Contributing

### Making changes

1. Create a new branch for your changes with the following naming convention: `feature/feature-name` or `bug/bug-name`
    1. Create the branch with `git checkout -b [branch name]`
2. Make your changes in clear, incremental commits and commit them to your branch with:
    1. `git add [file name]` to add a file to the staging area or `git add -A` to add all unstaged files
    2. `git commit -m "[commit message]"` to commit staged changes
3. Push your changes to the remote branch with `git push -u origin [branch name]`
    1. Note: The `-u` flag is only needed the first time you push to a new branch to specify the upstream remote. After which you may just use `git push`.
4. When you have addressed a feature or bug, create a pull request to merge your changes from your remote branch into remote staging branch. See [Creating a pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) for more information.
5. Once your pull request has been approved, merge your changes into the remote staging branch. See [Merging a pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/merging-a-pull-request) for more information.
6. Staging will be merged into main when a new release is ready to be deployed to production.
