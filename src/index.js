import visit from 'unist-util-visit';

const HEADER_TAGS = [
  '// Header: ',
  '# Header: ',
].map(s => s.toLowerCase());
const CLASS_NAME = 'gatsby-code-header';

module.exports = function gatsbyRemarkCodeHeaders(
  { markdownAST },
  { className: customClassName } = {},
) {
  visit(markdownAST, 'code', (node, index) => {
    const lines = node.value.split('\n');
    const headerLine = lines[0].toLowerCase();
    const headerTag = HEADER_TAGS.filter(t => headerLine.startsWith(t))[0];
    if (!headerTag) {
      // Ignore code blocks without a valid header line.
      return;
    }

    // Build the header node.
    const header = headerLine.slice(headerTag.length);
    const headerNode = {
      type: 'html',
      value: `
<div class="${customClassName || CLASS_NAME}"><h5>${header}</h5></div>
        `.trim(),
    };

    // Insert the header node into the AST.
    markdownAST.children.splice(index, 0, headerNode);

    // Remove the header comment line from the code.
    node.value = lines.slice(1).join('\n');
  });

  return markdownAST;
};
