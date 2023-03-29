# prettier-plugin-organize-angular-decorators

Plugin for prettier to organize properties in Angular decorators

## Usage

First of all, install the plugin:

```
npm install -D prettier-plugin-organize-angular-decorators
```

After that, configure it in `.prettierrc` or `prettierrc.js`

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
  ]
}
```
