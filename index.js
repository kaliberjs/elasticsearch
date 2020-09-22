module.exports = {
  text,
  keyword,
  integer,
  long,
  date,
  completion,
  searchAsYouType,
  flexibleContent,
  repeater,
  object,
}

function text() { return { type: 'text' } }
function keyword() { return { type: 'keyword' } }
function integer() { return { type: 'integer' } }
function long() { return { type: 'long' } }
function completion() { return { type: 'completion' }}
function searchAsYouType() { return { type: 'search_as_you_type' }}
function date() { return { type: 'date' }}
function object(properties) { return { properties } }

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
  return object({
    items: {
      type: 'nested',
      properties: Object.entries(fields).reduce(
        (result, [name, type]) => ({ ...result, [name]: type }),
        {}
      )
    }
  })
}
