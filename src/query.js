export function and(...queries) { return { bool: { must: queries.filter(Boolean) } } }
export function or(...queries) { return { bool: { should: queries.filter(Boolean) } } }
export function not(...queries) { return { bool: { must_not: queries.filter(Boolean) } } }
export function term(field, value) { return { term: { [field]: value } } }
export function matchAll() { return { match_all: {} } }
export function match(conditions) { return { match: conditions } }
export function terms(field, array) { return { terms: { [field]: array } } }
export function range(field, conditions) { return { range: { [field]: { ...conditions } } } }

export function nested(path, query, otherProps) {
  return {
    nested: {
      path,
      ignore_unmapped: true,
      query,
      ...otherProps
    }
  }
}

export function filter(...queries) {
  const filter = queries.filter(Boolean)
  return Boolean(filter.length) && { bool: { filter } }
}

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

export function filterByWeight(query, { weight }) {
  return { filter: query, weight }
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
  }
}

function queryString(fields, query) {
  return {
    query_string: {
      fields,
      query
    }
  }
}
