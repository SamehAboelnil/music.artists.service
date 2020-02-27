/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import { ImportMock, MockManager } from 'ts-mock-imports';
import * as MusicBrainzApiItem from 'musicbrainz-api';
import Service from './service';

describe('selectService', () => {
  let iMusicBrainzApiMock: MockManager<MusicBrainzApiItem.MusicBrainzApi>;
  let service: Service;

  beforeEach(() => {
    iMusicBrainzApiMock = ImportMock.mockClass<MusicBrainzApiItem.MusicBrainzApi>(MusicBrainzApiItem, 'MusicBrainzApi');
    // Be sure to mock out dependencies before creating the service
    service = new Service();
  });

  afterEach(() => {
    iMusicBrainzApiMock.restore();
  });

  it('should return list of artists if number of artis is more than one', async () => {
    const artistsResponse = {
      count: 7,
      artists: [
        {
          name: 'sameh',
        },
      ],
    };
    // Typescript will complain if getItem doesn't exist on ItemService.
    iMusicBrainzApiMock.mock('search', artistsResponse);

    const result = await service.getArtistsData('artistName');
    expect(result).toBe(artistsResponse);
  });

  it('should return empty list of artis if no artists matched the searched name', async () => {
    const artistsResponse = {
      count: 0,
    };
    // Typescript will complain if getItem doesn't exist on ItemService.
    iMusicBrainzApiMock.mock('search', artistsResponse);

    const result = await service.getArtistsData('artistName');
    expect(result).toBe(artistsResponse);
  });


  it('should return empty list of releases of only one artist found and he/she has no releases', async () => {
    const artistsResponse = {
      count: 1,
      artists: [
        {
          name: 'sameh',
          id: 342432,
        },
      ],
    };
    // Typescript will complain if getItem doesn't exist on ItemService.
    iMusicBrainzApiMock.mock('search', artistsResponse);
    const result = await service.getArtistsData('artistName');
    expect(result).toBe(artistsResponse);
  });
});
