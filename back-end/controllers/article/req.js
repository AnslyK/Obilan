async function articleList(req, res) {
    const request = "SELECT art_id, art_name FROM article_art";
    con.query(request, function(err, result) {
        if(err) throw err;
        if(!result)
        return res.status(401).json({
            text: "Aucun article encore posté"
        });
        return res.status(200).json({
            result
        });
    })
}

async function articleDetail(req, res) {
    const id = req.params.id
    const request = 'SELECT * FROM article_art WHERE art_id= ?';
    con.query(request, [id], function(err, result) {
        if(err) throw err;
        if(!result)
        return res.status(401).json({
            text: "Id inconnu"
        });
        return res.status(200).json({
            result
        })
    })
}

async function addCommentArt(req, res) {
    const text = req.body.text
    const name = req.body.name
    const artId = req.body.artId

    console.log(req.body)
    console.log("text : "+text)
    console.log("name : "+name)
    console.log("artId : "+artId)

    if(!text)
    return res.status(401).json({
        text: "champ vide"
    });

    const requestId = "SELECT usr_id FROM user_usr WHERE usr_name=?"
    con.query(requestId, [name], function(err, result){
        if(err) return err
        const request = "INSERT INTO comment_cmt (cmt_text, art_id, usr_id) VALUES( ?, ?, ?)"
        con.query(request, [text, artId, result[0].usr_id], function(err,result){
            if(err) throw err
            console.log("addComment: ajout réussi")
            return res.status(200).json({
                text: "ajout réussi"
            })
        })
    })


}

async function getCommentArt(req, res) {
    const id = req.params.id
    const request = 'SELECT cmt_id, cmt_text, usr_name FROM comment_cmt NATURAL JOIN user_usr WHERE art_id=?'
    con.query(request, [id], function(err, result) {
        if(err) throw err
        return res.status(200).json(
            result
        )
    })
}

async function getReviewArt(req, res) {
    const art_id = req.params.id
    const request = 'SELECT rvw_mark, rvw_text FROM review_rvw WHERE art_id=?'
    con.query(request, [art_id], function(err, result) {
        if(err) throw err
        if(!result)
        return res.status(401).json({
            text: "getReview: pas de données"
        })
        return res.status(200).json({
            result,
        })
    })
}

//On export les fonctions
exports.articleList = articleList;
exports.articleDetail = articleDetail;
exports.addCommentArt = addCommentArt;
exports.getReviewArt = getReviewArt;
exports.getCommentArt = getCommentArt;