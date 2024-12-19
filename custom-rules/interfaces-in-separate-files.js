export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure interfaces and types are declared in separate files from implementations',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      interfaceMixed:
        'Interface "{{ name }}" must be moved to a separate file.',
      typeMixed: 'Type "{{ name }}" must be moved to a separate file.',
    },
    schema: [],
  },
  create(context) {
    let hasImplementation = false

    return {
      Program(node) {
        node.body.forEach(stmt => {
          if (
            stmt.type === 'ClassDeclaration' ||
            stmt.type === 'FunctionDeclaration' ||
            stmt.type === 'ExportDefaultDeclaration'
          ) {
            hasImplementation = true
          }
        })

        node.body.forEach(stmt => {
          if (stmt.type === 'TSInterfaceDeclaration') {
            if (hasImplementation) {
              context.report({
                node: stmt,
                messageId: 'interfaceMixed',
                data: { name: stmt.id.name },
              })
            }
          }

          if (
            stmt.type === 'ExportNamedDeclaration' &&
            stmt.declaration?.type === 'TSTypeAliasDeclaration'
          ) {
            if (hasImplementation) {
              context.report({
                node: stmt.declaration,
                messageId: 'typeMixed',
                data: { name: stmt.declaration.id.name },
              })
            }
          }
        })
      },
    }
  },
}
