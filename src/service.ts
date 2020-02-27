/* eslint-disable import/extensions */
import { MusicBrainzApi } from 'musicbrainz-api';
import config from './config';

export default class Service {
  mbApi: MusicBrainzApi;

  constructor() {
    this.mbApi = new MusicBrainzApi(config);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private async searchArtist(name: string) {
    const artists = await this.mbApi.search('artist', { artistname: name });
    return artists;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private async searchReleases(artistId: string) {
    const result = await this.mbApi.search('release', { arid: artistId });
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public async getArtistsData(artis) {
    try {
      const artists = await this.searchArtist(artis);
      const numberOfArtits = artists.count;
      if (numberOfArtits === 1) {
        // eslint-disable-next-line dot-notation
        const artId = artists['artists'][0].id;
        const result = await this.searchReleases(artId);
        return result;
      }
      return artists;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Error occoured calling down stream', JSON.stringify(err)); // TODO replace with proper loging library
      // TODO wrape the system error with Custom error
      throw err;
    }
  }
}
