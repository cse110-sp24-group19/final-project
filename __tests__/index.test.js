import fs from 'fs';
import path from 'path';

describe('Basic HTML structure tests', () => {
    let htmlContent;

    beforeAll(() => {
        const htmlFilePath = path.join(process.cwd(), 'index.html');
        htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
    });

    it('should contain a DOCTYPE declaration', () => {
        expect(htmlContent).toMatch(/^\s*<!DOCTYPE html>/i);
    });

    it('should contain an html element', () => {
        expect(htmlContent).toMatch(/<html.*?>.*<\/html>/s);
    });

    it('should have a head and a body section', () => {
        expect(htmlContent).toMatch(/<head.*?>.*<\/head>/s);
        expect(htmlContent).toMatch(/<body.*?>.*<\/body>/s);
    });

    it('should include a meta charset="UTF-8" within the head', () => {
        expect(htmlContent).toMatch(/<head.*?<meta charset="UTF-8">.*<\/head>/s);
    });

    it('should include a viewport meta tag with appropriate content within the head', () => {
        const viewportMetaRegex = /<head.*?<meta name="viewport" content="width=device-width, initial-scale=1.0">.*<\/head>/s;
        expect(htmlContent).toMatch(viewportMetaRegex);
    });

    it('should include a title tag within the head', () => {
        expect(htmlContent).toMatch(/<head>.*<title>.*<\/title>.*<\/head>/s);
    });
});