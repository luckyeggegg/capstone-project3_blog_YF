import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000; // Use the environment variable if available

let articleList = [];   // a list for articles posted
let nextPostId = 1;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")) // state the default static files' directory


app.get("/", (req, res) => {
    res.render("index.ejs", { postList: articleList });
});

app.get("/newPost", (req, res) => {
    res.render("newPost.ejs");
});

app.post("/posts/createPost", (req, res) => {    
    const articleInfo = {
        articleTitle: req.body["title"],
        articleContent: req.body["content"],
        articleAuthor: req.body["author"],
        articleId: nextPostId,
        articleTime: new Date().toLocaleString()
    };
    articleList.push(articleInfo);
    nextPostId++;
    res.redirect("/");  // A "post-redirect-get" (PRG) pattern method should be used here to avoid the last status as "Post" when refreshing the page (if so, there will be additional new article posts divs to be displayed on the page every time refreshing the page)
    console.log(articleList);
})

app.get("/editPost/:id", (req, res) => {
    const postId = parseInt(req.params.id, 10); // Extract the ID from the route parameter and convert it to an integer

    const articleToUpdate = articleList.find(article => article.articleId === postId);  // Find the article in the articleList by comparing the article's ID to postId

    if (articleToUpdate) {
        // If article is found, render the edit page with the data of article to update
        res.render("editPost.ejs", { articleToUpdate: articleToUpdate});
    } else {
        // If no article is found, send a 404 error
        res.status(404).send("Article is not found.");
    }
});

app.post("/posts/updatePost/:id", (req, res) => {
    const updateId = parseInt(req.params.id, 10);

    const articleIndex = articleList.findIndex(article => article.articleId === updateId);

    if (articleIndex !== -1) {
        // Update the article with new information
        articleList[articleIndex].articleTitle = req.body.title;
        articleList[articleIndex].articleContent = req.body.content;
        articleList[articleIndex].articleAuthor = req.body.author;
        articleList[articleIndex].articleTime = new Date().toLocaleString();

        // Redirect to the home page
        res.redirect("/");
    } else {
        res.status(404).send("Article is not found.");
    }
});

app.delete("/posts/deletePost/:id", (req, res) => {
    const deleteId = parseInt(req.params.id, 10);
    const articleIndex = articleList.findIndex(article => article.articleId == deleteId);
    if (articleIndex !== -1) {
         // Remove the article from the list
        articleList.splice(articleIndex, 1);

        // Send a response indicating success
        res.status(200).send({message: "Post deleted successfully"});
} else {
     // If no article is found, send a 404 error
     res.status(404).send({ message: 'Article not found' });
}
});


app.listen(port, () => {
    console.log(`Server has started on port ${port}.`);
    console.log(articleList);
})