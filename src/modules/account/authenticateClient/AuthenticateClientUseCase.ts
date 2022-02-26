import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAutheticateClient {
    username: string
    password: string
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAutheticateClient){
        // Receber username, password

        // Verificar se há username cadastrado
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if (!client) {
            throw new Error("Username of password invalid")
        }

        // Verificar se senha corresponde ao username
        const passwordMatch = await compare(password, client.password)

        if (!passwordMatch) {
            throw new Error("Username of password invalid")
        }

        // Gerar token
        const token = sign({username}, "dbc91d239950a1ef0b34db8538497403", {
            subject: client.id,
            expiresIn: "1d"
        })

        return token
    }
}