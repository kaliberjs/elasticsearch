import { expect, it } from '@jest/globals'
import { filterByWeight, match, and, range } from '../src/query'

it('generates a filterByWeight query', () => {
  const expectedOutput = { filter: { match: { post_type: 'example' } }, weight: 150, }
  const output = filterByWeight(match({ post_type: 'example' }), { weight: 150 })
  expect(output).toEqual(expectedOutput)
})

it('generates a filterByWeight query with multiple conditions', () => {
  const expectedOutput = {
    filter: {
      bool: {
        must: [
          { match: { post_type: 'example' } },
          { match: { status: 'open' } },
          { range: { date: { gte: 10, lte: 10 } } }
        ]
      }
    },
    weight: 125,
  }

  const conditions = and(
    match({ post_type: 'example' }),
    match({ status: 'open' }),
    range('date', { gte: 10, 'lte': 10 }),
  )

  const output = filterByWeight(conditions, { weight: 125 } )
  expect(output).toEqual(expectedOutput)
})
