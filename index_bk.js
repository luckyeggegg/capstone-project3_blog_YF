import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let articleList = [];   // a list for articles posted

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")) // state the default static files' directory


app.get("/", (req, res) => {
    res.render("index_bk.ejs", { postList: articleList });
});

app.get("/newPost", (req, res) => {
    res.render("newPost_bk.ejs");
});

app.post("/", (req, res) => {    
    const articleInfo = {
        articleTitle: req.body["title"],
        articleContent: req.body["content"],
        articleAuthor: req.body["author"],
        articleId: articleList.length + 1,
        articleTime: new Date().toLocaleString()
    };
    articleList.push(articleInfo);
    res.redirect("/",);
})


app.listen(port, () => {
    console.log(`Server has started on port ${port}.`);
    console.log(articleList);
})