import { ListsController } from './controller';
import { Router } from 'express';
import { Routes } from '../../models/routes.model';
import express from 'express';

export class ListsRoutes implements Routes<ListsController> {
  readonly router: express.Router;
  readonly controller: ListsController;

  private routes = Router();

  constructor(router: express.Router, controller: ListsController) {
    this.router = router;
    this.controller = controller;
    this.init();
  }

  init(): void {
    /**
     * @swagger
     * /lists:
     *   get:
     *     tags:
     *       - lists
     *     summary: Get lists.
     *     description: Get all lists.
     *     operationId: getLists
     *     responses:
     *       '200':
     *         description: Fetched lists successfully.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ListModelList'
     *       '500':
     *         description: Something unexpected happened.
     */
    this.routes.get('/', this.controller.getListsHandler.bind(this.controller));

    /**
     * @swagger
     * /lists:
     *   post:
     *     tags:
     *       - lists
     *     summary: Create a list.
     *     description: Create a new list.
     *     operationId: createList
     *     requestBody:
     *       description: Create a new list.
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ListModel'
     *     responses:
     *       '200':
     *         description: Successfully created list.
     *       '400':
     *         description: Bad request.
     *       '500':
     *         description: Failed to create new record.
     */
    this.routes.post(
      '/',
      this.controller.createListHandler.bind(this.controller)
    );

    /**
     * @swagger
     * /lists:
     *   put:
     *     tags:
     *       - lists
     *     summary: Edit a list.
     *     description: Update an existing list by id, e.g. add items or rename the list.
     *     operationId: editList
     *     requestBody:
     *       description: Update an existing list.
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ListModel'
     *     parameters:
     *       - in: query
     *         name: id
     *         type: string
     *         required: true
     *         example: 507f1f77bcf86cd799439011
     *     responses:
     *       '200':
     *         description: Successful edit.
     *       '304':
     *         description: No changes made.
     *       '400':
     *         description: Bad request.
     */
    this.routes.put('/', this.controller.editListHandler.bind(this.controller));

    /**
     * @swagger
     * /lists:
     *   delete:
     *     tags:
     *       - lists
     *     summary: Delete a list.
     *     description: Delete an existing list by id
     *     operationId: deleteList
     *     parameters:
     *       - in: query
     *         name: id
     *         type: string
     *         required: true
     *         example: 507f1f77bcf86cd799439011
     *     responses:
     *       '202':
     *         description: Successful delete.
     *       '400':
     *         description: Unsuccessful delete.
     *       '500':
     *         description: Something unexpected happened.
     */
    this.routes.delete(
      '/',
      this.controller.deleteListHandler.bind(this.controller)
    );

    this.router.use('/lists', this.routes);
  }
}
