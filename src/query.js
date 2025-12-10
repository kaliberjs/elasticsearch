/** @import { Falsy } from './types.ts' */

/** @arg {(Falsy | Record<string, *>)[]} queries */
export function and(...queries) { return { bool: { must: queries.filter(Boolean) } } }
/** @arg {(Falsy | Record<string, *>)[]} queries */
export function or(...queries) { return { bool: { should: queries.filter(Boolean) } } }
/** @arg {(Falsy | Record<string, *>)[]} queries */
export function not(...queries) { return { bool: { must_not: queries.filter(Boolean) } } }
/**
 * @arg {string} field
 * @arg {string} value
 */
export function term(field, value) { return { term: { [field]: value } } }
export function matchAll() { return { match_all: {} } }
/** @arg {Record<string, *>[]} conditions */
export function match(conditions) { return { match: conditions } }
/**
 * @arg {string} field
 * @arg {string[]} array
 */
export function terms(field, array) { return { terms: { [field]: array } } }
/**
 * @arg {string} field
 * @arg {Record<string, *>} conditions
 */
export function range(field, conditions) { return { range: { [field]: { ...conditions } } } }

/**
 * @arg {string} path
 * @arg {Record<string, *>} query
 * @arg {Record<string, *>} [otherProps]
 */
export function nested(path, query, otherProps = undefined) {
  return {
    nested: {
      path,
      ignore_unmapped: true,
      query,
      ...otherProps
    }
  }
}

/** @arg {(Falsy | Record<string, *>)[]} queries */
export function filter(...queries) {
  const filter = queries.filter(Boolean)
  return Boolean(filter.length) && { bool: { filter } }
}

/**
 * @arg {string[]} fields
 * @arg {string} query
 */
export function search(fields, query) {
  // https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#_reserved_characters
  const queryWithoutPreservedCharacters = query
    .replace(/[<>]/g, '')
    .replace(/([+-=!(){}\[\]^"~*?:\\/]|&&|\|\|)/g, '\\$&')
    .trim()

  return or(
    multiMatch(fields, query),
    queryString(fields, `*${queryWithoutPreservedCharacters}*`),
  )
}

/**
 * @arg {Record<string, *>} query
 * @arg {{ weight: number }} config
 */
export function filterByWeight(query, { weight }) {
  return { filter: query, weight }
}

/**
 * @arg {string[]} fields
 * @arg {string} query
 */
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
  }
}

/**
 * @arg {string[]} fields
 * @arg {string} query
 */
function queryString(fields, query) {
  return {
    query_string: {
      fields,
      query
    }
  }
}
