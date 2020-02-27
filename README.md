# coles-code-challenge

## Overview

Solution is deployed and can be accessed at:

https://ii8gpelry8.execute-api.us-east-1.amazonaws.com/dev/music/artists/{name}

## Development

```
### Install node_modules
npm i


### Run all tests
npm run test


### Deploy the app

serverless deploy

## Logging

Currently, just using console.log, a better logging library should be used instead


## Future work

I implemented the solution with 3 hours time boxed, there are more can be added if required

Define response model
Schema validation
Proper error handling
Create customer error response & custom exception to wrap inner exception
More Unit testing coverage
Currently , I just mock the search method regardless first parameter, which lead to last unit test not to be accurate
Unit tests currently dosn't have the proper model, so it's not really measurment for the code coverage, I put it for illustration purpose
Due to some secuirty restriction on my laptop, I didn't push code to GitHub