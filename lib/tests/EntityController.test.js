process.env.NODE_ENV = 'test';
const HttpMock = require('node-mocks-http');
const Boom = require('boom');
const EntityController = require('../controllers/EntityController');

describe('EntityController', () => {
  const entityService = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn()
  };
  const entityController = new EntityController({
    entityName: 'Entity',
    entityService
  });

  describe('create', () => {
    it('should respond with HTTP status 201 and the created entity', async () => {
      const inputEntity = {
        name: 'Some name',
        description: 'Some description'
      };

      const expectedEntity = Object.assign({}, inputEntity, { id: 1 });

      const request = HttpMock.createRequest({ body: inputEntity });
      const response = HttpMock.createResponse();

      entityService.create.mockReturnValueOnce(Promise.resolve(expectedEntity));

      await entityController.create(request, response, () => {});

      const actualEntity = JSON.parse(response._getData());

      expect(actualEntity).toEqual(expectedEntity);
      expect(response._isJSON()).toBe(true);
      expect(response._getStatusCode()).toBe(201);
      expect(response._getHeaders().Location).toBe(`/entities/1`);
    });

    it('should respond with HTTP status 400 when underlying service detects invalid input', async () => {
      const inputEntity = {
        description: 'Some description'
      };

      const request = HttpMock.createRequest({ body: inputEntity });
      const response = HttpMock.createResponse();

      const next = jest.fn();

      entityService.create.mockReturnValueOnce(Promise.reject(new Error('Service.ERROR_INVALID_INPUT')));

      await entityController.create(request, response, next);

      expect(next).toBeCalledWith(Boom.badRequest('Service.ERROR_INVALID_INPUT'));
    });
  });
  // describe('getAll', () => {
  //   it('should respond with all of the requested entities as json', async () => {
  //
  //   })
  // })
});
