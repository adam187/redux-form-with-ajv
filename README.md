# redux-form-with-ajv

This package transforms the generated [ajv](https://github.com/epoberezkin/ajv) errors to the redux form error style, so you use json-schemas easily. It also supports custom errors messages done by the [ajv-errors](https://github.com/epoberezkin/ajv-errors) package.

## Installation
```npm install --save redux-form-with-ajv```

## Usage (For more detailed instructions look at examples)

```javascript
import validate from 'redux-form-with-ajv'

export default reduxForm({
  form: 'yourForm',
  validate: validate(yourJsonSchema)
})(YourForm)
```

## Run examples

### Simple validation
```npm run examples:simple```

### Dynamic validation with FieldArrays and customized error messages
```npm run examples:fieldArrays```
