const fetchMock = require('jest-fetch-mock');
fetchMock.enableMocks();

const { fetchCrewDetails } = require('../../src/server'); // Update with the actual file path

// Define the mock data for the SpaceX crew details
const mockCrewDataSuccess = [
  { agency: 'NASA', name: 'Robert Behnken"' },
  { agency: 'NASA', name: 'Douglas Hurley' }
];
const mockCrewDataEmpty = [];

describe('Test fetchCrewDetails', () => {
  let currentMockData = mockCrewDataSuccess; // Default to successful mock data

  beforeEach(() => {
    // Reset fetch mock before each test and set up the initial response
    fetchMock.mockClear();
    fetchMock.mockResponse(() => Promise.resolve(JSON.stringify(currentMockData.shift())));
  });

  afterEach(() => {
    fetchMock.mockClear();
    fetchMock.resetMocks(); // Resets all mocks, useful if you're setting up specific mocks in individual tests
  });

  it('fetches crew details successfully from an API and returns an array of crew details', async () => {
    const crewIds = ['123', '456'];
    const data = await fetchCrewDetails(crewIds);

    expect(data).toBeDefined();
    expect(data).toBeInstanceOf(Array);
    if (data.length) {
      expect(data[0]).toHaveProperty('agency');
      expect(data[0]).toHaveProperty('name');
    }
  });


});