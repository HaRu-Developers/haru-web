module.exports = {
  parserPreset: {
    name: 'conventional-changelog-conventionalcommits',
    parserOpts: {
      headerPattern:
        /^(✨|🔨|♻️|🐛|🚑️|💄|🎨|🔧|✏️|📝|💬|📦️|🔥|🩹|✅|🔀|💚|🌐|🚀|🔒️|⬆️|⬇️|🚧|💡|🤔|👷|🍻)\s([A-Z][a-z]*)(?:\((.*)\))?!?: (.*)$/,
      headerCorrespondence: ['emoji', 'type', 'scope', 'subject'],
      referenceActions: null,
      issuePrefixes: ['#'],
    },
  },

  extends: ['gitmoji', '@commitlint/config-conventional'],

  rules: {
    'type-case': [2, 'always', 'pascal-case'],
    'type-enum': [
      2,
      'always',
      [
        'Feat',
        'Fix',
        'Refactor',
        'Bug',
        'Hotfix',
        'Ui',
        'Style',
        'Config',
        'Typo',
        'Docs',
        'Comment',
        'Package',
        'Remove',
        'Chore',
        'Test',
        'Merge',
        'Ci',
        'Perf',
        'Revert',
      ],
    ],
    'subject-empty': [2, 'never'],
    'header-full-stop': [2, 'never', '.'],
    'start-with-gitmoji': [2, 'always'],
    'subject-case': [0],
  },
};
