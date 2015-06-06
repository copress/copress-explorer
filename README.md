sycle-express-explorer
=============

Browse and test your Sycle app's APIs.

## Basic Usage

Below is a simple Sycle application. The explorer is mounted at `/explorer`.

```js
var sycle = require('sycle');
var express = require('express');
var rest = require('sycle-express-rest');
var explorer = require('../');
var port = 3000;

// create express application
var app = express();
app.disable('x-powered-by');

// create sycle application
var sapp = sycle();
sapp.registry.define('Product', {crud: true});
sapp.phase(sycle.boot.database());
sapp.boot(function (err) { if (err) throw err; });

// setup middlewares
var apiPath = '/api';
app.use('/explorer', explorer(sapp, { basePath: apiPath }));
app.use(apiPath, rest(sapp));
console.log("Explorer mounted at localhost:" + port + "/explorer");

// start server
app.listen(port);
```

## Advanced Usage

Many aspects of the explorer are configurable. 

See [options](#options) for a description of these options:

```js
// Mount middleware before calling `explorer()` to add custom headers, auth, etc.
app.use('/explorer', basicAuth('user', 'password'));
app.use('/explorer', explorer(sapp, {
  basePath: '/custom-api-root',
  swaggerDistRoot: '/swagger',
  apiInfo: {
    'title': 'My API',
    'description': 'Explorer example app.'
  },
  resourcePath: 'swaggerResources',
  version: '0.1-unreleasable'
}));
app.use('/custom-api-root', rest(sapp));
```

## Options

Options are passed to `explorer(sapp, options)`.

`basePath`: **String**

> Default: `'/api'`.

> Sets the API's base path. This must be set if you are mounting your api
> to a path different than '/api', e.g. with
> `app.use('/custom-api-root', rest(sapp));

`swaggerDistRoot`: **String** 

> Sets a path within your application for overriding Swagger UI files.

> If present, will search `swaggerDistRoot` first when attempting to load Swagger UI, allowing
> you to pick and choose overrides to the interface. Use this to style your explorer or
> add additional functionality.

> See [index.html](public/index.html), where you may want to begin your overrides.
> The rest of the UI is provided by [Swagger UI](https://github.com/wordnik/swagger-ui).

`apiInfo`: **Object**

> Additional information about your API. See the 
> [spec](https://github.com/wordnik/swagger-spec/blob/master/versions/1.2.md#513-info-object).

Field Name | Type | Description
---|:---:|---
<a name="infoTitle"/>title | `string` | **Required.** The title of the application.
<a name="infoDescription"/>description | `string` | **Required.** A short description of the application.
<a name="infoTermsOfServiceUrl"/>termsOfServiceUrl | `string` | A URL to the Terms of Service of the API.
<a name="infoContact"/>contact | `string` | An email to be used for API-related correspondence.
<a name="infoLicense"/>license | `string` | The license name used for the API.
<a name="infoLicenseUrl"/>licenseUrl | `string` | A URL to the license used for the API.

`resourcePath`: **String**

> Default: `'resources'`

> Sets a different path for the 
> [resource listing](https://github.com/wordnik/swagger-spec/blob/master/versions/1.2.md#51-resource-listing).
> You generally shouldn't have to change this.

`version`: **String**

> Default: Read from package.json

> Sets your API version. If not present, will read from your app's package.json.
