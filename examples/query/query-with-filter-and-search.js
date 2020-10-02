import { and, filter, matchAll, term, search, nested, or } from '@kaliber/elasticsearch/query'

const searchQuery = 'Waldo'
const taxonomy = 'books'

const query = and(
  searchQuery
    ? or(
      search(['title'], searchQuery),
      nested('flexible_content.text', search(['flexible_content.text.data.text'], searchQuery)),
      nested('flexible_content.video', search(['flexible_content.video.data.title'], searchQuery)),
      nested('flexible_content.image', search(['flexible_content.image.data.caption'], searchQuery))
    )
    : matchAll(),
  filter(
    taxonomy && term('taxonomy.slug', taxonomy)
  )
)

console.log(query)
