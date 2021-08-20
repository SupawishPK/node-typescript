import { Express, Request, Response } from 'express'
import {
  createUserSchema,
  createUserSessionSchema,
} from '../../../schema/user.schema'
import { createUserSessionHandler } from '../controllers/session.controller'
import { createUserHandler } from '../controllers/user.controller'
import validateRequest from '../middlewares/validateRequest'

export default function (app: Express) {
  
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

  // Register user
  app.post('/api/users', validateRequest(createUserSchema), createUserHandler)

  // Login
  app.post('/api/sessions',validateRequest(createUserSessionSchema),createUserSessionHandler)

  // // Get the user's sessions
  // app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  // // Logout
  // app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler); */

  // // Create a post
  // app.post(
  //   "/api/posts",
  //   [requiresUser, validateRequest(createPostSchema)],
  //   createPostHandler
  // );

  // // Update a post
  // app.put(
  //   "/api/posts/:postId",
  //   [requiresUser, validateRequest(updatePostSchema)],
  //   updatePostHandler
  // );

  // // Get a post
  // app.get("/api/posts/:postId", getPostHandler);

  // // Delete a post
  // app.delete(
  //   "/api/posts/:postId",
  //   [requiresUser, validateRequest(deletePostSchema)],
  //   deletePostHandler
  // ); 
}
