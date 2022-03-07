import { Request, Response } from "express";
import { AuthenticateDeliverymanUseCase } from "./AuthenticateDeliverymanUseCase";


export class AuthenticateDeliverymanController {
    async handle(request: Request, response: Response) {
        const { username, password } = request.body

        const authenticateClientUseCase = new AuthenticateDeliverymanUseCase()
        const result = await authenticateClientUseCase.execute({
            username,
            password
        })

        return response.status(200).json(result)
    }
}