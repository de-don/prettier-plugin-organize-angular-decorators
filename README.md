# prettier-plugin-organize-angular-decorators

Plugin for [Prettier](https://prettier.io/) that enforces a consistent order of
properties inside Angular decorators like `@Component` and `@Directive`.
It works by reordering the decorator object according to a user defined list of
property names.

This plugin is written in TypeScript and tested via GitHub Actions. Tagged
releases are automatically published to npm.

## Prettier compatibility

- For prettier 2.x.x use version 1.x.x of this plugin.
- For prettier 3.x.x use version 2.x.x of this plugin.

## Installation

Install the plugin in your project:

```
npm install -D prettier-plugin-organize-angular-decorators
```

Then configure it in `.prettierrc`, `prettierrc.js` or your preferred Prettier
configuration file.

```json
{
  "plugins": ["prettier-plugin-organize-angular-decorators"],
  "componentDecoratorOrder": [
    "standalone",
    "selector",
    "templateUrl",
    "styleUrls",
    "changeDetection",
    "providers"
  ],
  "directiveDecoratorOrder": [
    "selector",
    "providers"
  ],
  "pipeDecoratorOrder": [
    "name",
    "pure"
  ],
  "injectableDecoratorOrder": [
    "providedIn",
    "deps"
  ],
  "moduleDecoratorOrder": [
    "imports",
    "declarations"
  ]
}
```

If you want to run the plugin only in some directories, configure
`angularOrganizePatterns`:

```json
{
  "plugins": ["prettier-plugin-organize-angular-decorators"],
  "componentDecoratorOrder": [
    "standalone",
    "selector",
    "templateUrl",
    "styleUrls",
    "changeDetection",
    "providers"
  ],
  "angularOrganizePatterns": [
    "./src/shared/**/*",
    "./src/modules/**/shared/**/*"
  ]
}
```

### Options

- **`componentDecoratorOrder`** – array that defines the desired order of
  properties in `@Component` decorators.
- **`directiveDecoratorOrder`** – array that defines the desired order of
  properties in `@Directive` decorators.
- **`pipeDecoratorOrder`** – array that defines the desired order of
  properties in `@Pipe` decorators.
- **`injectableDecoratorOrder`** – array that defines the desired order of
  properties in `@Injectable` decorators.
- **`moduleDecoratorOrder`** – array that defines the desired order of
  properties in `@NgModule` decorators.
- **`angularOrganizePatterns`** – optional list of glob patterns. The plugin
  only runs on files matching these patterns. If the array is empty the plugin
  runs for all files.

Use the special value `$SPREAD$` inside an order array to specify where object
spread elements (`...`) should appear in the resulting decorator.

### Running tests

```bash
npm test
```

### CI/CD

The project uses GitHub Actions. Every pull request and push to `main` runs the
test suite. Pushing a tag that starts with `v` triggers a publish workflow that
builds the project and publishes the package to npm.

