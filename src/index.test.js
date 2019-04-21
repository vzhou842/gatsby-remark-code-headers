import Remark from 'remark';
import stripIndent from 'strip-indent';
import merge from 'deepmerge';

import codeHeaders from './';

const setup = markdown => {
  const markdownAST = new Remark().parse(stripIndent(markdown));
  return [markdownAST, codeHeaders({ markdownAST: merge({}, markdownAST) })];
};

test('it ignores non-code blocks', () => {
  const [original, updated] = setup(`
    // Header: test
    # Hello World
  `);

  expect(original).toEqual(updated);
});

test(`it leaves code blocks without the header comment`, () => {
  const [original, updated] = setup(`
    \`\`\`js
    // A normal comment
    const a = 'b';
    \`\`\`
  `);

  expect(original).toEqual(updated);
});

test(`it adds a header and removes the header comment line when appropriate`, () => {
  const [original, updated] = setup(`
    \`\`\`js
    // Header: test file
    console.log('Hello World!');
    \`\`\`
  `);

  expect(original).not.toEqual(updated);

  const [htmlNode, markdownNode] = updated.children;

  expect(htmlNode.type).toBe(`html`);
  expect(htmlNode.value).toBe(`<div class="gatsby-code-header"><h5>test file</h5></div>`);
  expect(markdownNode.value).toBe(`console.log('Hello World!');`);
});
