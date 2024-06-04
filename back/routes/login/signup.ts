import { NextFunction, Request, Response } from "express";
import ConflictError from "../../errors/conflict-error";
import InternalError from "../../errors/conflict-error";

import crypto from 'crypto-js';
import UserModel from '../../models/user';

async function signup (req: Request, res: Response, next: NextFunction) {
    const user = req.body;
    
    const { email, password, name } = user;
  
    const hashedPassword = crypto.HmacSHA256(password, process.env.SECRET_KEY).toString();
    
    
    const newUser = new UserModel({
      email,
      password: hashedPassword
    })
  
    try {
      await newUser.save();
    } catch (error) {
      if (error.code === 11000) {
        next(new ConflictError('Пользователь с данным email уже существует'));
      }
      next(new InternalError('При создании пользователя произошла ошибка'));
    }

    res.status(201).send(newUser);
}

export default signup;
