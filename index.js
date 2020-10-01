module.exports = {
  completion,
  date,
  flexibleContent,
  integer,
  keyword,
  long,
  nested,
  object,
  repeater,
  searchAsYouType,
  text,
}

function text(props = {}) { return { type: 'text', ...props } }
function keyword(props = {}) { return { type: 'keyword', ...props } }
function integer(props = {}) { return { type: 'integer', ...props } }
function long(props = {}) { return { type: 'long', ...props } }
function completion(props = {}) { return { type: 'completion', ...props }}
function searchAsYouType(props = {}) { return { type: 'search_as_you_type', ...props }}
function date(props = {}) { return { type: 'date', ...props }}
function object(properties) { return { properties } }
function nested(properties) { return { type: 'nested', properties }}

function flexibleContent(types) {
  return {
    type: 'nested',
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

function repeater(fields) {
  return nested(fields)
}
