/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import 'source-map-support/register';
import Service from './service';

export const Artists: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const artistName = decodeURI(event.pathParameters.name);
  const service = new Service();
  try {
    const result = await service.getArtistsData(artistName);
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: result,
      }, null, 2),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err,
      }, null, 2),
    };
  }
};
