const request = require('supertest');
const { app } = require('../../src/server');

describe('GET /', () => {

  beforeEach(() => {
    // Reset fetch mock before each test
    fetchMock.mockClear();

//    console.log(Hello);
  });

  it('responds with the homepage', async () => {
    fetch.mockResponseOnce(JSON.stringify([{ id: 1, name: 'Falcon 9' }]));
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Falcon 9');
  });

  it('responds with 404 for non-existing routes', async () => {
    const response = await request(app).get('/non-existent-route');
    expect(response.statusCode).toBe(404);
  });

  it('responds with ...', async () => {
    fetch.mockResponseOnce(JSON.stringify([{ id: 2, name: 'DemoSat' }]));
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('DemoSat');
  });
});

describe('GET /launch/:id', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should fetch launch details and render successfully', async () => {
    const launchesData = [{ id: '1', name: 'FalsonSat' }];
    const launchDetails = { id: '1', name: 'FalconSat', crew: [] };
    const crewDetails = [];

    fetch.mockResponseOnce(JSON.stringify(launchesData));
    fetch.mockResponseOnce(JSON.stringify(launchDetails));

    const response = await request(app).get('/launch/5eb87cd9ffd86e000604b32a');

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith('https://api.spacexdata.com/v5/launches/5eb87cd9ffd86e000604b32a');
    expect(response.text).toContain("links");
  });
});
