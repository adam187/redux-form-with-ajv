'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ajv = require('ajv');

var _ajv2 = _interopRequireDefault(_ajv);

var _ajvErrors = require('ajv-errors');

var _ajvErrors2 = _interopRequireDefault(_ajvErrors);

var _objectPath = require('object-path');

var _objectPath2 = _interopRequireDefault(_objectPath);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ajvOptions = {
  allErrors: true,
  verbose: true, // to have information about the error.parentSchema
  useDefaults: true, // e.g.to may have default empty array
  jsonPointers: true // -> /members/0
};

var ajvErrorsOptions = { keepErrors: false };
var ajvWithErrors = new _ajvErrors2.default(new _ajv2.default(ajvOptions), ajvErrorsOptions);

var errorMessage = function errorMessage(_error) {
  return _error.message;
};

exports.default = function (schema) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  options = (0, _objectAssign2.default)({ ajv: ajvWithErrors, errorMessage: errorMessage }, options);

  return function (values) {
    var errors = {};
    var validate = options.ajv.compile(schema);
    var valid = validate(values.toJS ? values.toJS() : values);

    if (!valid) {
      validate.errors.forEach(function (_error) {
        var error = _error.params.errors ? _error.params.errors[0] : _error;

        var rootPath = error.dataPath;
        var property = error.params.missingProperty ? '/' + error.params.missingProperty : '';
        var fullPath = ('' + rootPath + property).replace(/\//g, '.').substring(1);

        if (error.parentSchema && error.parentSchema.type === 'array') {
          fullPath += '._error';
        }

        var message = options.errorMessage(_error);

        _objectPath2.default.set(errors, fullPath, message);
      });
    }
    return errors;
  };
};