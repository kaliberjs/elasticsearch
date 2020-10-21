export function text(props = {}) { return { type: 'text', ...props } }
export function keyword(props = {}) { return { type: 'keyword', ...props } }
export function integer(props = {}) { return { type: 'integer', ...props } }
export function long(props = {}) { return { type: 'long', ...props } }
export function completion(props = {}) { return { type: 'completion', ...props }}
export function searchAsYouType(props = {}) { return { type: 'search_as_you_type', ...props }}
export function date(props = {}) { return { type: 'date', ...props }}
export function object(properties) { return { properties } }
export function nested(properties) { return { type: 'nested', properties }}
export function array(props) { return props }

export function flexibleContent(types) {
  return {
    properties: Object.entries(types).reduce(
      (result, [name, type]) => ({
        ...result,
        [name]: {
          type: 'nested',
          properties: {
            index: integer(),
            data: type,
          }
        }
      }),
      {}
    )
  }
}

export function repeater(fields) {
  return nested(fields)
}
