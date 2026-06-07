# Evasion

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

installé via le terminal  " npm install gsap   " 

## Liaison de la page A propos

Cette section explique comment la page `A propos` est reliee dans l'application.

### 1) Routing (navigation)

Le fichier `src/app/app.routes.ts` declare les routes Angular:

- `path: 'about'` -> charge le composant `About`
- `path: 'apropos'` -> alias vers le meme composant `About`

Exemple:

```ts
{ path: 'about', component: About },
{ path: 'apropos', component: About },
```

### 2) Navbar (liens utilisateur)

Le menu est dans `src/app/shared/components/navbar/navbar.html`.

- `routerLink="/"` pour l'accueil
- `routerLink="/about"` pour la page A propos
- `routerLink="/contact"` pour la page Contact

Quand on clique sur `A propos`, Angular affiche le composant route dans le `router-outlet` principal.

### 3) Zone d'affichage centrale

Le `router-outlet` est dans `src/app/app.html`:

```html
<app-navbar></app-navbar>
<div class="container">
  <router-outlet></router-outlet>
</div>
```

Le composant actif (ex: `About`) est injecte automatiquement a cet endroit.

### 4) Composition de la page A propos

Le composant `About` est defini dans `src/app/features/about/about.ts`.

- `About` importe `CommonModule`
- `About` importe aussi `FrameworkGridComponent`

```ts
imports: [CommonModule, FrameworkGridComponent]
```

Template de la page `src/app/features/about/about.html`:

```html
<h1>A propos</h1>
<p>Voici les frameworks que j'utilise pour developper mes projets.</p>
<app-framework-grid></app-framework-grid>
```

### 5) Grille des frameworks

Le composant de grille est dans:

- `src/app/app/shared/components/framework-grid/framework-grid.ts`
- `src/app/app/shared/components/framework-grid/framework-grid.html`
- `src/app/app/shared/components/framework-grid/framework-grid.css`

Il affiche 3 cartes (Angular, Spring Boot, Docker) avec `*ngFor`.

## Etapes de verification rapide

```bash
npm install
ng serve
```

Puis ouvrir:

- `http://localhost:4200/about`
- ou `http://localhost:4200/apropos`

Build de verification:

```bash
ng build
```

