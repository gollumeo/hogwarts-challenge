import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Router', (group) => {
  group.setup(async () => {
    await testUtils.httpServer().start()
  })

  test('example test', async ({ client }) => {
    const response = await client.get('/')

    response.assertStatus(200)
    response.assertBody({ hello: 'world' })
  })
})
