const umt_env = require('../index');

test('Variables AWS DynamoDB', () => {
  expect(umt_env.db.UMT_COURTS).toBe('UMT_COURTS')
  expect(umt_env.db.UMT_MATCHES).toBe('UMT_MATCHES')
  expect(umt_env.db.UMT_MESSAGES).toBe('UMT_MESSAGES')
  expect(umt_env.db.UMT_USERS).toBe('UMT_USERS')
})