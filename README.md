# Skoolab - ESlint Config

Skoolab's custom ESLint configuration is designed to provide a consistent linting and formatting experience for TypeScript projects. It includes custom rules, Prettier integration, and support for functional programming styles.

---

## **Prerequisites**

Ensure the following tools are installed and compatible with your project:

- **Node.js**: Version `22` or higher.
- **npm**: Latest version.
- **eslint**: Version `^9.17.0` (peer dependency).
- **typescript**: Version `^5.7.2` (peer dependency).
- **prettier**: Version `^3.4.2` (peer dependency).

---

## **Installation**

To install the Skoolab ESLint configuration, run the following command:

```bash
npm install @skoolab/eslint-config eslint typescript prettier -D
```

---

## **Usage**

1. **Create an ESLint Config File**  
   Add a `eslint.config.js` file to your project root with the following content:

   ```javascript
   import skoolabConfig from '@skoolab/eslint-config'

   export default [...skoolabConfig]
   ```

2. **Lint Your Project**  
   Use the following command to lint your files:

   ```bash
   npx eslint .
   ```

---

## **Custom Rules**

The configuration includes custom rules tailored for TypeScript projects:

- **No Direct Return**: Avoid direct returns; values must be assigned to variables before returning.
- **Method Call Order**: Methods must be ordered top-to-bottom, respecting their call hierarchy.
- **Interfaces in Separate Files**: Interfaces must be declared in separate files from implementation.
- **Enforce Enums**: Prefer enums over multiple related constants.
