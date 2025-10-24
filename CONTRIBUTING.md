# 🛠 Contributing to the Official Strapi Client

Welcome to the **Strapi Client** repository. This guide walks you through the steps to get started with contributing to
the project, whether you're a maintainer or an external contributor.

---

## 📖 Table of Contents

- [📋 Prerequisites](#-prerequisites)
- [🛠 Setting Up the Project](#-setting-up-the-project)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
- [🏗️ Compiling the Changes](#-compiling-the-changes)
  - [Build](#build)
  - [Watch](#watch)
  - [Output](#output)
- [🧪 Testing the Changes](#-testing-the-changes)
  - [Unit Tests](#unit-tests)
    - [Running Unit Tests](#running-unit-tests)
    - [Test Coverage](#test-coverage)
    - [Configuration](#configuration)
    - [Writing Tests](#writing-tests)
    - [Mocks](#mocks)
  - [Demos](#demos)
    - [Setting Up the Demos](#setting-up-the-demos)
    - [Run the Demos](#run-the-demos)
- [🔎 Verifying Your Contribution](#-verifying-your-contribution)
- [📝 Commit Messages](#-commit-messages)
- [🎉 You're Ready to Contribute!](#-youre-ready-to-contribute)
- [🔐 Pull Request Reviews](#-pull-request-reviews)
  - [The Review](#the-review)
  - [Merging a PR](#merging-a-pr)
- [📚 Releases](#-releases)

---

## 📋 Prerequisites

Before you get started, ensure you have the following installed:

- **Node.js**: >=20.18.2 <=22.x.x. You can check your Node.js version using:
  ```bash
  node -v
  ```
- **pnpm**: the project requires `pnpm` as the package manager.

  To install `pnpm`, follow the [official documentation](https://pnpm.io/installation).

  You can check if pnpm is correctly installed using:

  ```bash
  pnpm -v
  ```

- **Git**: ensure Git is installed and properly configured.

---

## 🛠 Setting Up the Project

Follow these steps to set up the repository locally:

### 1. Clone the Repository

Clone the Strapi Client repository to your local machine:

**Using git**

```bash
git clone https://github.com/strapi/client.git
cd client
```

**Using the GitHub command-line tool**

```bash
gh repo clone strapi/client
cd client
```

### 2. Install Dependencies

Install all required dependencies using `pnpm`:

```bash
pnpm install
```

---

## 🏗️ Compiling the Changes

Both commands rely on the project's [rollup configuration](rollup.config.mjs).

### Build

Run the following command to build the source code:

```bash
pnpm build
```

### Watch

To automatically rebuild the project when changes are detected:

```bash
pnpm watch
```

Now, any changes you make to the `src` folder will trigger a rebuild.

### Output

The build process outputs the generated artifacts to the `dist` folder. These include:

- **Type Definitions**: TypeScript type definitions (`*.d.ts` files).
- **Bundles**: JavaScript bundles in the following formats:
  - **CommonJS (`cjs`)**: useful for Node.js applications or environments requiring CJS modules.
  - **ES Modules (`mjs`)**: ideal for modern JavaScript, TypeScript, and bundlers like Rollup or Webpack.
  - **Browser (`iife`)**: minified bundle for direct consumption in browser environments (for use in `<script>` tags).

---

## 🧪 Testing the Changes

### Unit Tests

Unit tests ensure the reliability and correctness of the features. The project
uses [Jest](https://jestjs.io) as the testing framework.

The project is configured for at least 95% of coverage on branches, functions, lines, and statement, but the project
aims to stay at 100% as long as possible.

> **When writing tests, aim to fully validate the features and reliability of the code. Coverage is just a baseline
> metric to ensure all paths are considered, but the focus should be on comprehensively testing each scenario—including
> common usage, edge cases, and unexpected events. Effective tests help ensure the project remains robust and maintainable
> over time.**

#### Running Unit Tests

To run all unit tests:

```bash
pnpm test
```

#### Test Coverage

Run all the tests and generate a test coverage report with:

```bash
pnpm test:coverage
```

> **Note:** you can pass any jest argument at the end of both commands, this can be useful to specific run tests based
> on their path or name

#### Configuration

The Jest configuration file for the project is located at [`jest.config.js`](./jest.config.js), it covers aspects like:

- Pattern matching for test files
- Coverage threshold requirements
- Handling of TypeScript and module paths

In the unlikely event you need to customize the test behavior, you can modify the file as needed.

#### Writing Tests

To be picked up by jest, test files should be located in the `./tests/unit/` directory with filenames ending in
`.test.ts`.

Use the following structure as a template for a unit test:

```typescript
// example.test.ts
import { ExampleClass } from '../src/example';

describe('Example Class', () => {
  it('should return the expected result when calling action', () => {
    // Arrange
    const input = 'inputValue';
    const expected = 'smth';
    const instance = new ExampleClass();

    const spy = jest.spyOn(instance, 'sideEffect');

    // Act
    const result = instance.action(input);

    // Assert
    expect(result).toBe(expected);
    expect(spy).toHaveBeenCalledWith(input);
  });
});
```

> **Note:** keep the **Arrange**/**Act**/**Assert** comments, they help scan through tests quicker and are part of the
> style convention for this project.

Ensure each test covers a specific function or component and includes edge cases where applicable.

#### Mocks

[Mocks](./tests/unit/mocks) are used to simulate external dependencies and provide deterministic behavior.

To use a mock, import it from the `tests/unit/mocks` folder and use it as a dependency for other objects/classes in your
test.

[Here](tests/unit/mocks/flaky-url-validator.mock.ts) is an example of a mock representing a flaky URL validator instance

```typescript
import { URLValidator } from '../../../src/validators';

/**
 * Class representing a FlakyURLValidator which extends URLValidator.
 *
 * This validator is designed to throw an error unexpectedly upon validation and should only be used in test suites.
 */
export class MockFlakyURLValidator extends URLValidator {
  validate() {
    throw new Error('Unexpected error');
  }
}
```

Feel free to create your own mocks based on your needs and export them from
the [folder's index.ts](tests/unit/mocks/index.ts).

### Demos

The repository includes demo projects to allow you to test your changes in different real-world scenarios.

#### Setting Up the Demos

From the project's root, set up the demo apps

```bash
pnpm demo setup
```

This installs the demos dependencies, builds them if needed, and sets up the Strapi app used by the different demos.

#### Run the Demos

To test your changes in the demo projects, start by running the Strapi app:

```bash
pnpm demo app:start
```

Then navigate to any of the example in the [./demo](./demo) folder, and refer to their respective `package.json` for
instructions on how to run them.

> **Note:** feel free to locally modify the demos to test your changes but avoid commiting them unless they provide fixes or additional functionality.

---

## 🔎 Verifying Your Contribution

Before submitting a PR (pull request), verify that all checks pass:

1. **Run Linting**
   ```bash
   pnpm lint
   ```
2. **Format Code**
   ```bash
   pnpm prettier:check
   ```
3. **TypeScript Checks**
   ```bash
   pnpm ts:check
   ```
4. **Unit Tests**
   ```bash
   pnpm test:coverage
   ```
5. **Production Build Check**
   ```bash
   NODE_ENV=production pnpm build:clean
   ```

---

## 📝 Commit Messages

When making commits, ensure they follow the project's commit message conventions.

These conventions are enforced using [commitlint](https://github.com/conventional-changelog/commitlint) and are based on
the [Conventional Commits specification](https://www.conventionalcommits.org/).

**Example:**

```text
feat: added a new example feature
```

You can find the exact configuration used as well as the list of available commit types [here](.commitlintrc.ts).

---

## 🎉 You're Ready to Contribute!

Once your changes are ready and have been thoroughly tested, it is time to submit a
new [Pull Request](https://github.com/strapi/client/compare).

When creating your PR, make sure the description is clear and provides enough details about the changes. Be sure to
include:

- **Purpose**: explain what the changes do and why they're needed.
- **Implementation Details**: mention any key decisions, the approach taken, and anything specific the reviewer should
  focus on.
- **Screenshots or Examples**: share anything that helps illustrate the results or how the changes should work.

Providing a well-written description helps reviewers understand the context and makes the review process smoother.

For more information about what is expected in a pull request, check the [template](.github/PULL_REQUEST_TEMPLATE.md).

For additional guidance, refer to the official [documentation](https://github.com/strapi/client) or join the discussion
on [Strapi's Discord](https://discord.strapi.io).

Happy contributing! 🚀

---

## 🔐 Pull Request Reviews

> This section is targeted to maintainers only

### The Review

When reviewing a PR, maintainers should pay close attention to several key points.

First, ensure the code adheres to the project's code style, conventions, and builds correctly.

**While [GitHub Actions](.github/workflows) typically handle these checks, you can manually verify with the following
commands**:

- **Linting**: checks for code style issues.

  ```bash
  pnpm lint
  ```

- **Formatting**: verifies if the code adheres to `Prettier` formatting rules.

  ```bash
  pnpm prettier:check
  ```

- **TypeScript Validation**: ensures TypeScript types are valid and there is no type-related breaking error.

  ```bash
  pnpm ts:check
  ```

- **Unit Tests**: runs all tests and checks if test coverage meets the required threshold.

  ```bash
  pnpm test:coverage
  ```

- **Build Check (Production)**: confirms that the client can successfully build for production.
  ```bash
  NODE_ENV=production pnpm build:clean
  ```

Next, thoroughly analyze the changes to ensure they're safe and well-implemented. Keep the following considerations in
mind:

- [ ] Does the PR introduce breaking changes to the public API?
- [ ] Is the logic clear and efficient, or does it need improvement?
- [ ] Are complex sections of code adequately documented with comments?
- [ ] Are there any potential security issues, such as weak input validation or unsafe dependency usage?
- [ ] Could the performance be negatively impacted by heavy operations or unnecessary computations?
- [ ] Are the unit tests comprehensive and sufficient for any new features?
- [ ] Does the code follow formatting and style guidelines?
- [ ] Are there opportunities to simplify overly complex or redundant code?
- [ ] Are edge cases and error handling adequately covered to prevent unexpected behavior?
- [ ] Do variable and function names enhance code readability, or are they vague and unclear?
- [ ] Does the change significantly increase the bundles' size, and if so, is the impact justified?

> Note: if you're uncertain about a particular change, its purpose, or its potential impact, don't hesitate to
> consult with other maintainers.

Finally, check out the branch locally and manually test the proposed changes.

### Merging a PR

A PR can only be merged into `main` by a maintainer if:

- All CI checks pass.
- The PR has been reviewed and approved by another maintainer.
- It is up to date with the target branch.

Any maintainer may merge a PR once all these conditions are met.

---

## 📚 Releases

> This section is targeted to maintainers only

---

To safely release a new version, maintainers must follow these steps:

1. Create a release branch from `main` and ensure it is up to date.

   The branch name should follow the format: `releases/<major>.<minor>.<patch>`.

2. Install the latest dependencies with `pnpm install`.
3. Update the package version in the root [package.json](./package.json):
   ```diff
   {
      "name": "@strapi/client",
   -  "version": "1.0.0",
   +  "version": "1.0.1",
      // ...
   }
   ```
4. Perform a dry-run publication with `pnpm publish --dry-run --tag latest`.
5. If the dry run succeeds, commit the version update with the message `release: <major>.<minor>.<patch>`. If it fails,
   resolve the issues before proceeding.
6. Create a version tag with `git tag v<major>.<minor>.<patch>`.
7. Push the tag to the remote repository: `git push origin v<major>.<minor>.<patch>`.
8. Publish the new version to NPM: `pnpm publish --tag latest`.
9. [Draft a new release](https://github.com/strapi/client/releases/new) on GitHub.
10. Select the newly created tag under the `Choose a tag` dropdown, leaving the `Target` as `auto`.
11. Click `Generate release notes`, review the content (for example, remove PRs related to the release process), and
    make
    necessary corrections.
12. Ensure the `Set as the latest release` option is selected, then click `Publish release`.
13. Push the release branch to the remote and create a pull request named `release: <major>.<minor>.<patch>` targeting
    the `main` branch.

> **Note:** in the long term, the goal will be to rely on a script or GitHub action to handle all the steps
> automatically
