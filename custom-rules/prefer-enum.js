export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prefer using enum instead of multiple related constants',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      preferEnum:
        'Consider using an enum instead of multiple related constants.',
    },
    schema: [],
  },
  create(context) {
    const constantDeclarations = []

    return {
      VariableDeclarator(node) {
        if (
          node.init &&
          node.init.type === 'Literal' &&
          /^[A-Z_]+$/.test(node.id.name)
        ) {
          constantDeclarations.push(node)
        }
      },
      'Program:exit'() {
        if (constantDeclarations.length > 2) {
          context.report({
            node: constantDeclarations[0],
            messageId: 'preferEnum',
          })
        }
      },
    }
  },
}
