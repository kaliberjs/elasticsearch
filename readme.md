# Elasticsearch

This package contains a custom render and a set of functions that can be used with @kaliber/build to build mappings. It also holds a set of util functions to query elasticsearch into a more readable format.

## Installation
```
yarn add @kaliber/elasticsearch
```

## Motivation
We like to write clean code. So whe made a set of util functions that help us create more readable mappings and write simple queries to send to the elasticsearch api.

_The renderer is used for an internal plugin. So this is probably not that interesting for everybody. But 
the rest of the project can be used without it._

Note: This library is precompiled using kaliberjs/pack (https://github.com/kaliberjs/pack)

## Usage of the utils
You can find more examples in the `/examples` folder.

_*.mapping.js_
```js
import { text, keyword, object } from '@kaliber/elasticsearch/mapping'

export default {
  mappings: {
    dynamic: 'strict',
    properties: {
      id: keyword(),
      title: text(),
      taxonomy: object({
        title: text(),
        slug: keyword(),
      }),
    }
  }
}
```

_example.js_
```js
import { filter, matchAll, term, search } from '@kaliber/elasticsearch/query'

const searchQuery = 'Waldo'
const taxonomy = 'books'

const query = and(
  searchQuery
    ? search(['title'], searchQuery),
    : matchAll(),
  filter(
    taxonomy && term('taxonomy.slug', taxonomy)
  )
)
```

### Usage of the Renderer
To configure @kaliber/build to use the custom renderer in this package, you have to update the config/default.js file:

```js
kaliber: {
  templateRenderers: {
    mapping: '@kaliber/elasticsearch/mapping-to-php-renderer'
  }
}
```

![](https://media.giphy.com/media/SUp0ZNb0pmL3G65I2k/giphy.gif)

## Disclaimer
This library is intended for internal use, we provide __no__ support, use at your own risk.
