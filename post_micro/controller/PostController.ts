import { auth } from "@clerk/nextjs";
import prisma from "../config/db.config";


class PostController {
    static async index(req, res) {
        try {
            const posts = await prisma.post.findMany({});
            return res.json({ posts: posts });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong" });
        }
    }

    static async store(req, res) {
        try {
            const authUser = req.user;
            const { title, content } = req.body;
            const post = await prisma.post.create({
                data: {
                    user_id: authUser.id,
                    title,
                    content
                }
            });
            return res.json({ message: "Post created successfully", post: post });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong" });
        }
    }
}

export default PostController;