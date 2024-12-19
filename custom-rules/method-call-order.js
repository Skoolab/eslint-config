export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure methods are defined in the order they are called within a class',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      incorrectOrder:
        'Method "{{ method }}" should be declared below the method "{{ caller }}" that calls it.',
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      ClassBody(node) {
        const methods = []
        const methodMap = new Map()

        node.body.forEach(element => {
          if (element.type === 'MethodDefinition') {
            const methodName = element.key.name
            methods.push({
              name: methodName,
              node: element,
              loc: element.loc.start.line,
            })
            methodMap.set(methodName, element)
          }
        })

        methods.forEach((method, index) => {
          const body = method.node.value.body
          if (!body || !body.body) return

          const calls = []
          body.body.forEach(stmt => {
            if (
              stmt.type === 'ExpressionStatement' &&
              stmt.expression.type === 'CallExpression'
            ) {
              const callee = stmt.expression.callee
              if (
                callee.type === 'MemberExpression' &&
                callee.object.type === 'ThisExpression'
              ) {
                const calledMethod = callee.property.name
                calls.push(calledMethod)
              }
            }
          })

          calls.forEach(calledMethod => {
            const calledMethodIndex = methods.findIndex(
              m => m.name === calledMethod
            )
            if (calledMethodIndex > -1 && calledMethodIndex < index) {
              context.report({
                node: method.node,
                messageId: 'incorrectOrder',
                data: {
                  method: method.name,
                  caller: methods[calledMethodIndex].name,
                },
                fix(fixer) {
                  const sourceCode = context.getSourceCode()

                  const calledMethodNode = methods[calledMethodIndex].node
                  const methodNode = method.node

                  const calledMethodText = sourceCode.getText(calledMethodNode)
                  const methodText = sourceCode.getText(methodNode)

                  return [
                    fixer.replaceText(calledMethodNode, methodText),
                    fixer.replaceText(methodNode, calledMethodText),
                  ]
                },
              })
            }
          })
        })
      },
    }
  },
}
