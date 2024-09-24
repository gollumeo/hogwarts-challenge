import { configApp } from '@adonisjs/eslint-config'
export default [
  {
    ...configApp(),
    'semi': ['error', 'always'],
    'indent': ['error', 'tab']
  },
]
