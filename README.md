# Installation

```
yarn add @kaliber/elasticsearch-mapping-compiler
```

## Example
```js
// mapping/page.mapping.js
const { long, text, keyword } = require('@kaliber/elasticsearch-mapping-compiler')
const { pageContentMapping } = require('./domain/page-content')

const mapping = {
  mappings: {
    dynamic: 'strict',
    properties: {
      post_id: long(),
      post_title: text(),
      post_url: keyword(),
      cf_flexible_content: pageContentMapping,
    }
  }
}

module.exports = {
  mapping
}
```

```js
// mapping/domain/page-content.js
const { flexibleContent, repeater, object, text } = require('@kaliber/elasticsearch-mapping-compiler')

module.exports = {
  pageContentMapping: flexibleContent(
    ['text', textGroup()],
    ['image', imageGroup()],
    ['stappenplan', stappenplanGroup()]
  ),
}

function textGroup() {
  return object({
    text: text(),
  })
}

function imageGroup() {
  return object({
    caption: text(),
  })
}

function stappenplanGroup() {
  return repeater(
    ['title', text()],
    ['content', flexibleContent(
      ['text', textGroup()],
      ['image', imageGroup()]
    )]
  )
}
```
