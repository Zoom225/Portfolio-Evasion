import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Importation du nouveau fournisseur

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  // Ajout de provideHttpClient() au tableau des fournisseurs globaux
  providers: [
    provideRouter(routes, withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })),
    provideHttpClient() // Rend le client HTTP disponible dans toute l'application
  ]
};
