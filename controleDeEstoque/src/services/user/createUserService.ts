import prismaClient from "../../prisma"
import { hash } from "bcryptjs"
import { UserRequest } from "../../controllers/models/interfaces/User/UserRequest"

class CreateUserService{
    async execute({name, email, password}: UserRequest) {
        if (!email){
            throw new Error('Email incorret') 
        }
        const UserAlreadyExists= await prismaClient.user.findFirst({
            where: {
                email : email}
        })
        if (UserAlreadyExists) {
            throw new Error('Email already exist')
        }
        //encriptando nossa senha do usuario
        const passwordhash = await hash(password, 8)

        //criando nosso usuario
        const user = prismaClient.user.create({
            data : {
                name: name,
                email: email,
                password: passwordhash
            },

            select: {
                id: true,
                name: true,
                email: true,
            
            }
        })

        return user
      }
}

export {CreateUserService}