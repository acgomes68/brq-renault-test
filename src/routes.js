import { Router } from 'express';

import UserController from './app/controllers/UserController';
import UrlController from './app/controllers/UrlController';

const routes = new Router();

/*----------------------------------------------------------------------*/
// Public access routes

// Users
routes.get('/users/:id/urls', UserController.show);
routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.delete);

// Stats
routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

// URLs
routes.get('/appointments', UrlController.index);
routes.post('/appointments', UrlController.store);
routes.delete('/appointments/:id', UrlController.delete);

export default routes;
