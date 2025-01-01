export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow direct return of values in functions',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      noDirectReturn:
        'Direct return of values is not allowed; use an intermediate variable instead.',
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      ReturnStatement(node) {
        if (node.argument && node.argument.type !== 'Identifier') {
          context.report({
            node,
            messageId: 'noDirectReturn',
            fix(fixer) {
              const sourceCode = context.getSourceCode()
              const returnValue = sourceCode.getText(node.argument)
              const parentFunction = node.parent.parent
              const functionBody = parentFunction.body.body
              const indentation = '  '

              const variableName = 'value'

              const variableDeclaration = `${indentation}const ${variableName} = ${returnValue};\n`
              const returnStatement = `${indentation}return ${variableName};`

              return fixer.replaceTextRange(
                [functionBody[0].range[0], node.range[1]],
                `${variableDeclaration}${returnStatement}`
              )
            },
          })
        }
      },
    }
  },
}
