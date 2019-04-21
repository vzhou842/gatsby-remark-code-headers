# gatsby-remark-code-headers

Adds a header to code blocks.

## Install

You must be already using `gatsby-transformer-remark`. To install, run

```bash
$ npm install --save-dev gatsby-remark-code-headers
```

Then, in `gatsby-config.js`, add

```js
plugins: [
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-code-headers',
          options: {
            className: 'optional-custom-class-name'
          }
        }
      ]
    }
  }
]
```

## Usage

In your Markdown file, add a comment to the first line of your code block:

~~~markdown
### Code

```js
// Header: filename.js
console.log('This is filename.js');
```
~~~

**The header comment must be formatted exactly like the example above**. This plugin will replace the header comment with HTML for the header. It effectively transforms the above markdown into this:

~~~markdown
### Code

<div class="gatsby-code-header"><h5>filename.js</h5></div>
```js
console.log('This is filename.js');
```
~~~
