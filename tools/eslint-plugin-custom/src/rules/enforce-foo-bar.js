module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce that a variable named `foo` can only be assigned a value of `bar`.',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          classNamePattern: { type: 'string' },
          getInstanceMethodName: { type: 'string' },
          destroyInstanceMethodName: { type: 'string' },
          instancePropertyName: { type: 'string' },
        },
      },
    ],
  },
  create(context) {
    const { options: customizedOptions } = context;

    // Define the default configuration
    const defaultOptions = {
      classNamePattern: 'Service',
      getInstanceMethodName: 'getInstance',
      destroyInstanceMethodName: 'destroyInstance',
      instancePropertyName: '_instance',
    };

    const options = Object.assign(defaultOptions, customizedOptions[0]);

    return {
      ClassDeclaration(node) {
        if (!node.id || !node.id.name.endsWith(options.classNamePattern)) {
          return;
        }

        const classMethods = node.body.body;

        const hasGetInstanceMethod = classMethods.some((method) => method.key.name === options.getInstanceMethodName);
        if (!hasGetInstanceMethod) {
          context.report({
            node,
            message: `Singleton classes must have a static method named "${options.getInstanceMethodName}".`,
          });
        }

        const hasDestroyInstanceMethod = classMethods.some(
          (method) => method.key.name === options.destroyInstanceMethodName,
        );
        if (!hasDestroyInstanceMethod) {
          context.report({
            node,
            message: `Singleton classes must have a static method named "${options.destroyInstanceMethodName}".`,
          });
        }

        const instanceProperty = classMethods.find((property) => property.key.name === options.instancePropertyName);
        if (!instanceProperty) {
          context.report({
            node,
            message: `Singleton classes must have a private static property named "${options.instancePropertyName}".`,
          });
        }
        const sourceCode = context.getSourceCode();
        context.report({
          node,
          message: `${sourceCode
            .getText(node)
            .replace(/(\t|\n)/g, ' ')
            .replace(/(\s)\s+/g, '$1')}`,
        });
      },

      // Performs action in the function on every variable declarator
      VariableDeclarator(node) {
        console.error(node.id);
        // Check if a `const` variable declaration
        if (node.parent.kind === 'const') {
          // Check if variable name is `foo`
          if (node.id.type === 'Identifier' && node.id.name === 'foo') {
            // Check if value of variable is "bar"
            if (node.init && node.init.type === 'Literal' && node.init.value !== 'bara') {
              /*
               * Report error to ESLint. Error message uses
               * a message placeholder to include the incorrect value
               * in the error message.
               * Also includes a `fix(fixer)` function that replaces
               * any values assigned to `const foo` with "bar".
               */
              context.report({
                node,
                message: 'Value other than "bar" assigned to `const foo`. Unexpected value: {{ notBar }}.',
                data: {
                  notBar: node.init.value,
                },
                fix(fixer) {
                  return fixer.replaceText(node.init, '"bar"');
                },
              });
            }
          }
        }
      },
    };
  },
};
