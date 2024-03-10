const Follow = require("../models/Follow");
const Post = require("../models/Post");

const getPost = async (req, res) => {
    try {
        const userId = req.user.userId;
        const post = await Post.find({ userId });
        if (post.length <= 0) { return res.status(200).json({ post: "No Post Found" }) }
        return res.status(200).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user.userId;
        const post = new Post({ userId, content });
        await post.save();
        res.status(201).json({ message: 'Post created successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const { content } = req.body;
        await Post.findByIdAndUpdate(req.params.postId, { content });
        res.json({ message: 'Post updated successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getFeed = async (req, res) => {
    try {
        const userId = req.user.userId;
        const following = await Follow.find({ followerId: userId }).select('followeeId');
        const followeeIds = following.map(follow => follow.followeeId);

        const posts = await Post.aggregate([
            {
                $match: { userId: { $in: followeeIds } }
            },
            {
                $sort: { createdAt: -1, updatedAt: -1 }
            }
        ]);

        res.json(posts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { createPost, getPost, updatePost, deletePost, getFeed }