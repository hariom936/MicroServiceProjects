import prisma from "../config/db.config";
import axios from "axios";
import "dotenv";


class PostController {
    static async index(req, res) {
        try {
            const posts = await prisma.post.findMany({});
            console.log("Fetched posts:", posts);

            //Method 1

            // const postsWithUser = await Promise.all(
            //     posts.map(async (post) => {
            //         try {
            //             const response = await axios.get(`${baseUrl}/api/getUser/${post.user_id}`);
            //             return { ...post, ...response.data };
            //         } catch (error) {
            //             console.error(`Failed to fetch user for post ID ${post.id}:`);
            //             return { ...post, user: null }; // Gracefully handle missing user data
            //         }
            //     })
            // );

        //Method 2

        // Collect user IDs
        const userIds: string[] = posts.map(post => post.user_id);

        // Fetch users
        const response = await axios.post(`${process.env.AUTH_MICRO_URL}/api/getUsers`, { userIds });

        // const users = response.data.users;
        // let postsWithUser = posts.map(post => {
        //     const user = users.find(user => user.id === post.user_id);
        //     return { ...post, user };
        // });
        // console.log("Response from auth_micro:", response.data);

        // return res.json({ postsWithUser });

        //Method 3

        const users ={};
        response.data.users.forEach(user => {
            users[user.id] = user;
        });

        let postsWithUser = await Promise.all(
            posts.map(post => {
                const user = users[post.user_id];
                return { ...post, user };
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