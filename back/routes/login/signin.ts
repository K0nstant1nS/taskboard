import comparePassword from '../../utils/compare-passwords';
import UserModel from '../../models/user';
import jwt from 'jsonwebtoken';
import { internalError, notFound, unauthorized } from '../../utils/errors';
import { Request, Response } from "express";

async function signIn (req: Request, res: Response) {
    return UserModel.findUserByCredentials(req.body.email, req.body.password)
}

export default signIn

    

