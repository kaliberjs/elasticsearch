export function and(...queries) { return { bool: { must: queries.filter(Boolean) } } }
export function or(...queries) { return { bool: { should: queries.filter(Boolean) } } }
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
  return or(
    multiMatch(fields, query),
    queryString(fields, `*${query.trim()}*`), // trimming to prevent weird Elasticsearch behaviour
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
