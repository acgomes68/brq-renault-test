import { Router } from 'express';

import UserController from './app/controllers/UserController';
import UrlController from './app/controllers/UrlController';
import StatController from './app/controllers/StatController';

const routes = new Router();

/*----------------------------------------------------------------------*/
// Public access routes

// Users
routes.get('/users', UserController.index); // OK
routes.get('/users/:userId/stats', UserController.show); // OK
routes.post('/users/:userId/urls', UserController.update); // OK
routes.post('/users', UserController.store); // OK
routes.delete('/user/:id', UserController.delete); // OK

// Stats
routes.get('/stats', StatController.index); // OK
routes.get('/stats/:UrlId', StatController.show); // OK

// URLs
routes.get('/urls:id', UrlController.show);
routes.delete('/urls/:id', UrlController.delete);

export default routes;
