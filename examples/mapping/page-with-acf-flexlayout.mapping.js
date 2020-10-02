import { text, keyword, flexibleContent, object } from '@kaliber/elasticsearch/mapping'

export default {
  mappings: {
    dynamic: 'strict',
    properties: {
      id: keyword(),
      title: text(),
      flexible_content: flexibleContent({
        text: textGroup(),
        image: imageGroup(),
        video: videoGroup()
      }),
      taxonomy: object({
        title: text(),
        slug: keyword(),
      }),
    }
  }
}

function textGroup() {
  return object({
    text: text()
  })
}

function imageGroup() {
  return object({
    caption: text()
  })
}

function videoGroup() {
  return object({
    title: text()
  })
}
