const Follow = require("../models/Follow")

const followUser = async (req, res) => {
  try {
    const followerId = req.user.userId;
    const followeeId = req.params.userId;
    const user = await Follow.find({ followerId, followeeId });
    console.log(user)
    if (user.length == 0) {
      const follow = new Follow({ followerId, followeeId });
      await follow.save();
      return res.status(201).json({ message: 'Followed user successfully' });
    } else {
      return res.status(200).json({ message: 'User already Followed.' });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

const unfollowUser = async (req, res) => {
  try {
    const followerId = req.user.userId;
    const followeeId = req.params.userId;
    await Follow.findOneAndDelete({ followerId, followeeId });
    res.json({ message: 'Unfollowed user successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const getFollowing = async (req, res) => {
  try {
    const userId = req.user.userId;
    const following = await Follow.aggregate([
      {
        $match: { followerId: userId }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'followeeId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: '$user._id',
          username: '$user.username'
        }
      }
    ]);
    res.json(following);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getFollowers = async (req, res) => {
  try {
    const userId = req.user.userId;
    const followers = await Follow.aggregate([
      {
        $match: { followeeId: userId }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'followerId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: '$user._id',
          username: '$user.username'
        }
      }
    ]);
    res.json(followers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { followUser, unfollowUser, getFollowing, getFollowers }