function text() { return { type: 'text' } }
function keyword() { return { type: 'keyword' } }
function integer() { return { type: 'integer' } }
function long() { return { type: 'long' } }
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

module.exports = {
  text,
  keyword,
  integer,
  long,
  flexibleContent,
  repeater,
  object,
}
