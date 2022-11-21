const { NodeHtmlMarkdown } = require('node-html-markdown');
const fs = require('fs');
const { getMediumArticles } = require('medium-api-npm');
const mediumFetch2 = async () => {
   const { userPosts } = await getMediumArticles({
      auth: '26e72c2e3f80165b16c0a27ce6fb322b51287fa5a3441eb9787495a0dc6d8b562',
   });
   userPosts.forEach((element) => {
      let frontMatter = `--- \ntitle: ${element.title} \ndate: ${element.pubDate} \nimage: ${element.thumbnail} \nfeature_image: ${element.thumbnail} \nauthor: ${element.author} \n---\n`;
      let pageContent = NodeHtmlMarkdown.translate(element.content);
      let fullContent = frontMatter + pageContent;
      try {
         fs.writeFileSync(`./blog/${element.title.replace(/\s+/g, '-')}.md`, fullContent);
      } catch (err) {
         console.error(err);
      }
   });
};
mediumFetch2();
