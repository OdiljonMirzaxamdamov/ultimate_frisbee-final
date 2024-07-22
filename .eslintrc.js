module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'default-param-last': 'off', // отключение правила default-param-last
    'no-console': 'off', // отключение предупреждения no-console
    'no-shadow': 'off',
    'no-unused-vars': 'off', // отключение предупреждения о неиспользуемых переменных
    'react/prop-types': 'off', // отключение проверки prop-types в React компонентах
  },
};

// Зависимости для package.json в разделе devDependencies
// я специально отключил eslint временно чтобы доделать задачи
//   "eslint": "7.32.0",
//   "eslint-config-airbnb": "^19.0.4",
//   "eslint-plugin-import": "^2.29.1",
//   "eslint-plugin-jsx-a11y": "^6.9.0",
//   "eslint-plugin-react": "^7.34.3",
