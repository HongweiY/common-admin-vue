module.exports = {
    root: true,
    env: {
        es6: true,
        browser: true,
        node: true
    },
    extends: [
        'plugin:import/recommended',
        'plugin:markdown/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:vue/essential'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    plugins: [
        'vue'
    ],
    rules: {
        'no-console': ['warn', { allow: ['error'] }],
        'no-debugger': 'warn',
        'no-constant-condition': ['error', { checkLoops: false }],
        'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
        'no-return-await': 'error',
        'no-var': 'error',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'prefer-const': [
            'warn',
            { destructuring: 'all', ignoreReadBeforeAssign: true }
        ],
        'prefer-arrow-callback': [
            'error',
            { allowNamedFunctions: false, allowUnboundThis: true }
        ],
        'object-shorthand': [
            'error',
            'always',
            { ignoreConstructors: false, avoidQuotes: true }
        ],
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',

        'no-redeclare': 'off',
        // vue
        'vue/no-v-html': 'off',
        'vue/require-default-prop': 'off',
        'vue/require-explicit-emits': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'always',
                    component: 'always'
                },
                svg: 'always',
                math: 'always'
            }
        ],

        // import
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'object',
                    'type'
                ],

                pathGroups: [
                    {
                        pattern: 'vue',
                        group: 'external',
                        position: 'before'
                    },
                    {
                        pattern: '@vue/**',
                        group: 'external',
                        position: 'before'
                    },
                    {
                        pattern: '@element-plus/**',
                        group: 'internal'
                    }
                ],
                pathGroupsExcludedImportTypes: ['type']
            }
        ],
        'import/no-unresolved': 'off',
        'import/namespace': 'off',
        'import/default': 'off',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/named': 'off'
    }
}
