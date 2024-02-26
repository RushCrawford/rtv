const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue')

// GET ALL, POST ALL //
issueRouter.route('/user')
    .get(async (req,res,next)=> {
        try {
            const allIssues = await Issue.find({ user: req.auth._id }) // queries db for all documents in Issue collection that belong to the user
            res.status(200).send(allIssues)
        } catch (err) {
            res.status(500)
            return next(err)
        }
    })
    .post(async (req,res,next)=> {
        try {
            req.body.user = req.auth._id // grabs the _id from the req auth property and assigns it to the user property of the req.body
            const newIssue = new Issue(req.body) // creates a new instance of the Issue model and passes req.body as the data to it
            const savedIssue = await newIssue.save() // saves the new issue in db
            res.status(201).send(savedIssue)
        } catch (err) {
            res.status(500)
            return next(err)
        }
    })

issueRouter.get('/', async (req,res,next)=> {
    try {
        const allIssues = await Issue.find() // queries db for all documents in Issue collection 
        res.status(200).send(allIssues)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// UP VOTE ROUTE //
issueRouter.put('/upvote/:issueId', async (req,res,next)=> {
    try {
        const updatedIssue = await Issue.findOneAndUpdate(
            { _id: req.params.issueId},
            {
                $addToSet: { likedUsers: req.auth._id },
                $pull: { dislikedUsers: req.auth._id}
            },
            { new:true }
        )
        return res.status(200).send(updatedIssue)
    } catch (err) {
        if (err) {
            res.status(500)
            return next(err)
        }
    }
})

// DOWN VOTE ROUTE //
issueRouter.put('/downvote/:issueId', async (req,res,next)=> {
    try {
        const updatedIssue = await Issue.findOneAndUpdate(
            { _id: req.params.issueId},
            {
                $addToSet: { dislikedUsers: req.auth._id},
                $pull: { likedUsers: req.auth._id }
            },
            { new:true }
        )
        return res.status(200).send(updatedIssue)
    } catch (err) {
        if (err) {
            res.status(500)
            return next(err)
        }
    }
})

// BY ISSUE ID ROUTES, GET, PUT, DELETE // 
issueRouter.route('/:issueId')
    .get(async (req,res,next)=> {
        try {
            const issueId = req.params.issueId // pull id out of req
            const requestedIssue = await Issue.findById(issueId) // queries db for issue with matching id
            return res.status(200).send(requestedIssue)
        } catch (err) {
            res.status(500)
            return next(err)
        }
    })
    .delete(async (req,res,next)=> {
        try {
            const issueId = req.params.issueId // pull id out of req
            const deletedIssue = await Issue.findByIdAndDelete(issueId) // queries db for issue with matching id and deletes it
            return res.status(200).send(`Successfully deleted "${deletedIssue.title}"`)
        } catch (err) {
            res.status(500)
            return next(err)
        }
    })
    .put(async (req,res,next)=> {
        try {
            const updatedIssue = await Issue.findByIdAndUpdate( // queries db for issue with matching id and updates it with req.body
                req.params.issueId, // id to look for
                req.body, // new data to update the old data
                { new:true } // return the updated issue
            )
            return res.status(200).send(updatedIssue)
        } catch (err) {
            res.status(500)
            return next(err)
        }
    })

// BY USER ID ROUTE, GET // 
// issueRouter.route('/:userId')
//     .get(async (req,res,next)=> {
//         try {
//             const userId = req.params.userId
//             const userIssues = await Issue.findById(userId)    GOES THRU AS 200 BUT RETURNS NOTHING
//             console.log(userIssues)
//             return res.status(200).send(userIssues)
//         } catch (err) {
//             res.status(500)
//             return next(err)
//         }
//     })

module.exports = issueRouter