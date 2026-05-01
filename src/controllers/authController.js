import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
    try{
        const {name, email,password} = req.body;

    // checking if user exists
    const user_exists = await prisma.user.findUnique({
        where: {email: email},
    });
    if (user_exists){
        return res.status(400)
        .json({error: 'user already exists with this email'})
    }
//  Hash password
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password,salt);

// create user
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password: hash_password,
        },
    });

    res.status(201).json({
        status: 'success',
        data: {
            user:{
                id: user.id,
                name: name,
                email: email,
            }
        }
    })

    } catch (error) {
        console.error('error:', error.message);
        res.status(500).json({error: error.message, code: error.code, meta: error.meta});
    }
    
};

const login = async (req, res) => {
    const {email, password} = req.body;

    // check if user email exists in the table
     const user = await prisma.user.findUnique({
        where: {email: email},
     });

     if (!user){
        return res
        .status(401)
        .json({error: 'invalid email or password'})
    }

// verify password
const is_password = await bcryot.compare(password, user.password);

if (!is_password) {
    return res.status(401).json({error: 'invalid email or password'});
}

   res.status(201).json({
        status: 'success',
        data: {
            user:{
                id: user.id,
                name: name,
                email: email,
            }
        }
    })

};

export { register, login };