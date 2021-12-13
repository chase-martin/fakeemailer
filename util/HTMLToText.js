const { compile } = require("html-to-text");

function HTMLToText(html) {
    return new Promise((resolve, _) => {
        let text;
        try {
            console.log("converting html to text", html);
            text = compile(html, {
                word_wrap: 130
            });
        } catch(e) {
            console.log("Error converting html to text", e);
            // TODO: complete block-level elements list.
            text = html
                .replace(/<[a-z0-9-]+>/gi, "")
                .replace(/<\/[h1,h2,h3,h4,h5,h6,h7,div,p]+>/gi, "\n");
        }

        resolve(text);
    });
}

module.exports = HTMLToText;