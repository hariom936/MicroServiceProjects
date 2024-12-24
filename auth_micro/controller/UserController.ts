import prisma from "../config/db.config";


class UserController {
    static async getUser(req, res){
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where:{
                id: id,
            },
            select:{
                id: true,
                name: true,
                email: true,

            }
        });
        return res.json({user: user})
    }
}

export default UserController;