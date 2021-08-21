"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("../../../schema/user.schema");
const session_controller_1 = require("../controllers/session.controller");
const user_controller_1 = require("../controllers/user.controller");
const middlewares_1 = require("../middlewares");
function default_1(app) {
    app.get('/healthcheck', (req, res) => res.sendStatus(200));
    // Register user
    app.post('/api/users', middlewares_1.validateRequest(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    // Login
    app.post('/api/sessions', middlewares_1.validateRequest(user_schema_1.createUserSessionSchema), session_controller_1.createUserSessionHandler);
    // // Get the user's sessions
    // app.get("/api/sessions", requiresUser, getUserSessionsHandler);
    // Logout
    app.delete('/api/sessions', middlewares_1.requiresUser, session_controller_1.invalidateUserSessionHandler);
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
exports.default = default_1;
