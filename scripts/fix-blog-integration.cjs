const fs = require("fs");

let s = fs.readFileSync("src/pages/[lang]/index.astro", "utf-8");

s = s.replace(
  "const { blogs, totalPages } = await getBlog(lang, 1, SiteConfig.postsPerPage);\nconst topics = await getTopics(lang);\nconst pureContentBlogs = await getBlogCoreContent(blogs);",
  "const blogs = await getBlog(lang as Lang);\nconst pureContentBlogs = getBlogCoreContent(blogs);\nconst maxDisplay = SiteConfig.postsPerPage;\nconst { tagList, categoryList } = await getTopics(lang as Lang);",
);

s = s.replace(
  "<PostList posts={pureContentBlogs} />",
  '<PostList posts={pureContentBlogs.slice(0, maxDisplay)} slot="content" />',
);

s = s.replace(
  "<TopicPanel topics={topics} />",
  '<TopicPanel categories={categoryList} tags={tagList} slot="sidebar-start" />',
);

const oldPagination = `<Pagination
              current={1}
              total={totalPages}
              urlPrefix={\`\${SiteConfig.basePath}/\${lang}/posts\` as \`/\${string}\`}
            />`;

const newPagination = `{pureContentBlogs.length > maxDisplay && (
              <Pagination
                totalPages={Math.max(1, Math.ceil(pureContentBlogs.length / maxDisplay))}
                currentPage={1}
                basePath={\`/\${lang}\`}
                slot="footer"
              />
            )}`;

s = s.replace(oldPagination, newPagination);

fs.writeFileSync("src/pages/[lang]/index.astro", s, "utf-8");
console.log("Fixed blog and pagination integration in src/pages/[lang]/index.astro!");
