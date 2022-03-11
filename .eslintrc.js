module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:vue/essential',
        'standard'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    plugins: [
        'vue'
    ],
    rules: {
        indent: ['error', 4]
    }
}
