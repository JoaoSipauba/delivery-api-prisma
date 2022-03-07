import { prisma } from "../../../../database/prismaClient"
import { hash } from "bcrypt"

interface ICreateDeliveryman {
    username: string,
    password: string
}

export class CreateDeliverymanUseCase {
    async execute({ username, password }: ICreateDeliveryman) {
        // Validar se o usuário existe
        const deliverymanExist = await prisma.clients.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        })

        if (deliverymanExist) {
            throw new Error("Deliveryman already exists")
        }

        // Criptografar a senha
        const hashPassword = await hash(password, 10)

        // Salvar cliente
        const deliveryman = await prisma.deliveryman.create({
            data: {
                username,
                password: hashPassword
            }
        })

        return deliveryman
    }
}