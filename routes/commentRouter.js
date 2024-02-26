const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment')

commentRouter.get('/', async (req,res,next)=> {
    try {
        const allComments = await Comment.find() // queries db for all documents in Comment collection
        console.log(allComments)
        res.status(200).send(allComments)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})
// POST COMMENT //
commentRouter.route('/:issueId')
    .post(async (req,res,next)=> {
        try {
            req.body.issue = req.params.issueId // associates the comment with the issue it belongs to
            req.body.user = req.auth._id 
            const newComment = new Comment(req.body) // create a new instance of Comment with the data from req.body
            const savedComment = await newComment.save() // save the new comment
            return res.status(201).send(savedComment)
        } catch (err) {
            res.status(500)
            return next(err)
        }
    })



// EDIT COMMENT //
commentRouter.route('/:commentId')
    .delete(async (req,res,next)=> {
        try {
            const commentId = req.params.commentId
            const deletedComment = await Comment.findByIdAndDelete(commentId)
            return res.status(200).send(`${deletedComment.text} deleted`)
        } catch (err) {
            res.status(500)
            return next(err)
        }
    })

module.exports = commentRouter