# mailtu

Generate mailto: links programmatically

## Installation

Using npm `npm i mailtu`

Using yarn `yarn add mailtu`

Using pnpm `pnpm add mailtu`

## Usage

In CommonJS env

```javascript
const { createMailTo } = require('mailtu');
```

Using imports

```javascript
import { createMailTo } from 'mailtu';
```

Then

```javascript
const mailToLink = createMailTo('to@address.com', {
  subject: 'This is a test email',
  body: 'It was generated with the mailtu NPM package'
});

// mailToLink is mailto:to@address.com?subject=This%20is%20a%20test%20email&body=It%20was%20generated%20with%20the%20mailtu%20NPM%20package
```

Available fields are: `cc`, `bcc`, `subject`, `body`
