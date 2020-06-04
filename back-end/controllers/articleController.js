const article = require('./article/req.js');

module.exports = function (app) {
    app.get('/posts', article.articleList);
    app.get('/:id', article.articleDetail);
    app.post('/comment', article.addCommentArt);
    app.get('/review/:id', article.getReviewArt);
    app.get('/comment/:id', article.getCommentArt);
}