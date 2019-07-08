# Utilities For karbon Front End

## Install

```bash
npm install karbon-fe-utils
```

## Usage

### Customized Axios

Usage is the same as the [offical axios](!https://github.com/axios/axios).

The customized axios does 3 extra things:

- Inject a jwt handler

- Transform the request data from camelcase to underscore

- Transform the response data from underscore to camelcase
