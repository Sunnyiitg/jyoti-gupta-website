import Post from "../model/post.js";

export const CreatePost = async (req, res) => {
  const { userId, title, author, image, content } = req.body;

  try {
    const NewPost = new Post({ userId, title, author, image, content });

    await NewPost.save();

    res.status(200).send("Post is created...");
  } catch (e) {
    res.status(500).send("Something went wrong...");
  }
};

export const GetAllPost = async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json({ posts: posts });
  } catch (e) {
    res.status(500).send("Something went wrong...");
  }
};

export const GetSinglePost = async (req, res) => {
  try {
    const post = await Post.find({ _id: req.params.postId });

    res.status(200).json(post);
  } catch (e) {
    res.status(500).send("something went wrong...");
  }
};

export const GetUserposts = async (req, res) => {
  try {
    const userPost = await Post.find({ userId: req.params.id });

    if (userPost.length === 0) {
      res.status(404).send("No post found for the given user....");
    }

    res.status(200).json(userPost);
  } catch (e) {
    res.status(500).send("Something went wrong..");
  }
};

export const UpdatePost = async (req, res) => {
  const postId = req.params.postId;

  try {
    await Post.findByIdAndUpdate(
      { _id: postId },
      { $set: req.body },
      { new: true }
    );

    res.status(200).send(`Post id:${postId} updated successfully...`);
  } catch (e) {
    res.status(500).send("Something went wrong...");
  }
};

export const SearchPost = async (req, res) => {
  const searchText = req.query.text;

  try {
    //This is serchQuery of mongoDb
    // const data = await Post.aggregate([
    //   {
    //     $search: {
    //       index: "default",
    //       text: {
    //         query: searchText,
    //         path: {
    //           wildcard: "*",
    //         },
    //       },
    //     },
    //   },
    // ]);

    const data = await Post.find({ $text: { $search: searchText } });

    res.status(200).json(data);
  } catch (e) {
    res.status(500).send("Something went wrong...");
  }
};

export const DeletePost = async (req, res) => {
  const postId = req.params.postId;

  try {
    await Post.findByIdAndDelete({ _id: postId });

    res.status(200).send(`Post id:${postId} deleted successfully...`);
  } catch (e) {
    res.status(500).send("Something went wrong...");
  }
};
