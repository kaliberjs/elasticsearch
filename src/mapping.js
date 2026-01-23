/** @arg {Record<string, *>} props */
export function text(props = {}) { return { type: 'text', ...props } }
/** @arg {Record<string, *>} props */
export function keyword(props = {}) { return { type: 'keyword', ...props } }
/** @arg {Record<string, *>} props */
export function integer(props = {}) { return { type: 'integer', ...props } }
/** @arg {Record<string, *>} props */
export function long(props = {}) { return { type: 'long', ...props } }
/** @arg {Record<string, *>} props */
export function completion(props = {}) { return { type: 'completion', ...props }}
/** @arg {Record<string, *>} props */
export function searchAsYouType(props = {}) { return { type: 'search_as_you_type', ...props }}
/** @arg {Record<string, *>} props */
export function date(props = {}) { return { type: 'date', ...props }}
/** @arg {Record<string, *>} properties */
export function object(properties) { return { properties } }
/** @arg {Record<string, *>} properties */
export function nested(properties) { return { type: 'nested', properties }}
/** @arg {Record<string, *>} props */
export function array(props) { return props }
/** @arg {Record<string, *>} props */
export function boolean(props = {}) { return { type: 'boolean', ...props } }
/** @arg {Record<string, *>} props */
export function float(props = {}) { return { type: 'float', ...props } }

/** @arg {Record<string, *>} types */
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

/** @arg {Record<string, *>} fields */
export function repeater(fields) {
  return nested(fields)
}
