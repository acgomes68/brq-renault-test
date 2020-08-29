import { Router } from 'express';

import UserController from './app/controllers/UserController';
import UrlController from './app/controllers/UrlController';
import StatController from './app/controllers/StatController';

const routes = new Router();

/*----------------------------------------------------------------------*/
// Public access routes

// Users
routes.post('/users/:id/urls', UserController.update);
routes.get('/users/:id/stats', UserController.show);
routes.post('/users', UserController.store);
routes.delete('/user/:id', UserController.delete);

// Stats
routes.get('/stats', StatController.index);
routes.get('/stats/:id', StatController.show);

// URLs
routes.get('/urls:id', UrlController.show);
routes.delete('/urls/:id', UrlController.delete);

export default routes;
