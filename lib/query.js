"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.and = and;
exports.filter = filter;
exports.filterByWeight = filterByWeight;
exports.match = match;
exports.matchAll = matchAll;
exports.nested = nested;
exports.or = or;
exports.range = range;
exports.search = search;
exports.term = term;
exports.terms = terms;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function and() {
  for (var _len = arguments.length, queries = new Array(_len), _key = 0; _key < _len; _key++) {
    queries[_key] = arguments[_key];
  }

  return {
    bool: {
      must: queries.filter(Boolean)
    }
  };
}

function or() {
  for (var _len2 = arguments.length, queries = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    queries[_key2] = arguments[_key2];
  }

  return {
    bool: {
      should: queries.filter(Boolean)
    }
  };
}

function term(field, value) {
  return {
    term: {
      [field]: value
    }
  };
}

function matchAll() {
  return {
    match_all: {}
  };
}

function match(conditions) {
  return {
    match: conditions
  };
}

function terms(field, array) {
  return {
    terms: {
      [field]: array
    }
  };
}

function range(field, conditions) {
  return {
    range: {
      [field]: _objectSpread({}, conditions)
    }
  };
}

function nested(path, query, otherProps) {
  return {
    nested: _objectSpread({
      path,
      ignore_unmapped: true,
      query
    }, otherProps)
  };
}

function filter() {
  for (var _len3 = arguments.length, queries = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    queries[_key3] = arguments[_key3];
  }

  var filter = queries.filter(Boolean);
  return Boolean(filter.length) && {
    bool: {
      filter
    }
  };
}

function search(fields, query) {
  return or(multiMatch(fields, query), queryString(fields, "*".concat(query.trim(), "*")) // trimming to prevent weird Elasticsearch behaviour
  );
}

function filterByWeight(query, _ref) {
  var weight = _ref.weight;
  return {
    filter: query,
    weight
  };
}

function multiMatch(fields, query) {
  return {
    multi_match: {
      query,
      fields,
      type: 'most_fields',
      operator: 'and',
      fuzziness: 'AUTO',
      prefix_length: 2
    }
  };
}

function queryString(fields, query) {
  return {
    query_string: {
      fields,
      query
    }
  };
}
//# sourceMappingURL=query.js.map