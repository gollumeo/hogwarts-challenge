import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import hash from '@adonisjs/core/services/hash'

test.group('Auth', (group) => {
  group.setup(async () => {
    await testUtils.httpServer().start()
  })

  test('a new user can try to register', async ({ assert, client }): Promise<any> => {
    assert.plan(2)

    const response = await client.post('/auth/register')

    assert.equal(response.status(), 200)
    assert.isObject(response.body())
  })

  test('a new user can register with valid data', async ({ assert, client }) => {
    const data = {
      username: 'test',
      email: 'test@test.com',
      password: hash.make('123456'),
    }

    const response = await client.post('/auth/register').form(data)

    assert.equal(response.status(), 200)
    assert.equal(response.body().message, 'User successfully created')
    assert.properties(response.body(), ['message', 'user', 'token'])
  })
})
