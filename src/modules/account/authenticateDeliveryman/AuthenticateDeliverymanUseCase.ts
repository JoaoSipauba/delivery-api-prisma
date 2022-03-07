import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAutheticateDeliveryman {
    username: string
    password: string
}

export class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAutheticateDeliveryman) {
        // Receber username, password

        // Verificar se há username cadastrado
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        })

        if (!deliveryman) {
            throw new Error("Username or password invalid")
        }

        // Verificar se senha corresponde ao username
        const passwordMatch = await compare(password, deliveryman.password)

        if (!passwordMatch) {
            throw new Error("Username or password invalid")
        }

        // Gerar token
        const token = sign({ username }, "dbc91d239950a1ef0b34db8538497403", {
            subject: deliveryman.id,
            expiresIn: "1d"
        })

        return token
    }
}