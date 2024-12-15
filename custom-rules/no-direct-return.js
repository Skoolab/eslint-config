export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow direct return of values in functions',
      category: 'Best Practices',
      recommended: false,
    },
    messages: {
      noDirectReturn:
        'Direct return of values is not allowed; use an intermediate variable instead.',
    },
    schema: [],
  },
  create(context) {
    return {
      ReturnStatement(node) {
        if (node.argument && node.argument.type !== 'Identifier') {
          context.report({
            node,
            messageId: 'noDirectReturn',
          })
        }
      },
    }
  },
}
