import prisma from "../config/db.config";


class UserController {
    static async getUser(req, res){
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where:{
                id: id,
            },
        });
        return res.json({user: user})
    }
}

export default UserController;