import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from "jsonwebtoken";

export const newUser = async (req: Request, res: Response) =>{
   
    const {username,email, password} = req.body;
    
    //validamos si el usuario ya existe en la base de datos
    const user = await User.findOne({where: {username: username}})
    //select * from user where username = parametro

    if(user){
        return res.status(400).json({
            msg: 'ya existe un usuario con el nombre ' + username
        })
    }
   
    const hashedPassword = await bcrypt.hash(password,10)

    try {
        //guardamos usuario en la base de datos
        await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })
        res.json({
            msg: 'Usuario '+ username +' ,creado exitosamente'
            
        })

    } catch (error) {
        res.status(400).json({
            msg: 'upps ocurrio un error',
            error
        })
    }

    
    
} 

export const loginUser = async (req: Request, res: Response) =>{
   
    const { username, password} = req.body;

    //validamos si el usuario existe en la base de datos
    const user: any = await User.findOne({where: {username: username}});

    if (!user){
        return res.status(400).json({
            msg: 'No existe un usuario con el nombre '+ username + ' en la base de datos'
        })
    }

    //validamos password
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid){
        return res.status(400).json({
            msg: 'Password incorrecta'
        })
    }

    //generamos token
    const token = jwt.sign({
        username: username
    }, process.env.SECRET_KEY || 'pepito123');

    res.json(token);
} 