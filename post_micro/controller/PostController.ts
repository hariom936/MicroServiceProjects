import prisma from "../config/db.config";
import axios from "axios";
import "dotenv";


class PostController {
    static async index(req, res) {
        try {
            const posts = await prisma.post.findMany({});
            console.log("Fetched posts:", posts);
    
            const baseUrl = process.env.AUTH_MICRO_URL || "http://localhost:3001";
            console.log("Base URL:", baseUrl);
    
            const postsWithUser = await Promise.all(
                posts.map(async (post) => {
                    try {
                        const response = await axios.get(`${baseUrl}/api/getUser/${post.user_id}`);
                        return { ...post, ...response.data };
                    } catch (error) {
                        console.error(`Failed to fetch user for post ID ${post.id}:`);
                        return { ...post, user: null }; // Gracefully handle missing user data
                    }
                })
            );
            return res.json({ postsWithUser });
        } catch (error) {
            console.error("Error in index function:", error);
            return res.status(500).json({ message: "Something went wrong", error });
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