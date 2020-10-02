# Elasticsearch

This package contains a custom render and util functions that can be used with kaliberjs to build mappings. It also holds a set of util functions to query elasticsearch into a more readable format.

```
yarn add @kaliber/elasticsearch
```

## config/default.js
```js
kaliber: {
  templateRenderers: {
    mapping: '@kaliber/elasticsearch/renderer/mapping-renderer'
  }
}
```

## Example
```js
// mapping/page.mapping.js
import { long, text, keyword } from '@kaliber/elasticsearch'
import { pageContentMapping } from './domain/page-content'

export default  {
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
```

```js
// mapping/domain/page-content.js
import { flexibleContent, repeater, object, text } from '@kaliber/elasticsearch'

export const pageContentMapping = flexibleContent({
  'text': textGroup(),
  'image': imageGroup(),
  'stappenplan': stappenplanGroup()
})

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
  return repeater({
    'title': text(),
    'content': flexibleContent({
      'text': textGroup(),
      'image': imageGroup()
    })
  })
}
```
