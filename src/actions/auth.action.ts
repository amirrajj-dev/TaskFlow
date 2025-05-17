'use server'

import jwt  from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { User } from '@/generated/prisma'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const  emailReg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

export const signup =  async (user : Pick<User , 'name' | 'email' | 'username' | 'password'>)=>{
    try {
        const {email , name , password , username} = user
        if (!email.trim() || !name.trim() || !password.trim() || !username.trim()) {
            return {
                error : 'All fields are required',
                success : false,
                status : 400
            }
        }
        if (!emailReg.test(email)) {
            return {
                error : 'Invalid email',
                success : false,
                status : 400
            }
        }
        if (password.length < 6 || password.length > 20) {
            return {
                error : 'Password should be between 6 and 20 characters',
                success : false,
                status : 400
            }
        }

        const existingUser = await prisma.user.findUnique({
            where : {
                email
            }
        })
        if (existingUser) {
            return {
                error : 'user already exists',
                success : false,
                status : 400
            }
        }

        const hashedPassword = await bcrypt.hash(password , 10)
        const users = await prisma.user.findMany()
        const newUser = await prisma.user.create({
            data : {
                name,
                email,
                username,
                password : hashedPassword,
                role : users.length > 0 ? 'USER' : 'ADMIN'
            }
        })
        const cookiesStore = await cookies() 
        const token = jwt.sign({
            id : newUser.id
        } , process.env.JWT_SECRET as string , {
            expiresIn : '1d'
        })
        cookiesStore.set('todo-app-token' , token , {
            path : '/',
            httpOnly : true,
            secure : true,
            sameSite : 'strict',
            maxAge : 60 * 60 * 24 // 1 day
        })
        revalidatePath('/')
        return {
            success : true,
            status : 201,
            message : 'User created successfully',
            user : {
                id : newUser.id,
                name : newUser.name,
                username : newUser.username,
                email : newUser.email,
                role : newUser.role,
                tasks : []
            }
        }
    } catch (error) {
        return {
            error : error instanceof Error ? error.message : 'Something went wrong',
            success : false,
            status : 500
        }
    }
}

export const signin = async (user : Pick<User , 'email' | 'password'>) => {
    try {
        const {email , password} = user
        if (!email.trim() || !password.trim()) {
            return {
                error : 'All fields are required',
                success : false,
                status : 400
            }
        }
        if (!emailReg.test(email)) {
            return {
                error : 'Invalid email',
                success : false,
                status : 400
            }
        }
        if (password.length < 6 || password.length > 20) {
            return {
                error : 'Password should be between 6 and 20 characters',
                success : false,
                status : 400
            }
        }
        const existingUser = await prisma.user.findUnique({
            where : {
                email
            },
            include : {
                tasks : true
            }
        })
        if (!existingUser) {
            return {
                error : 'Invalid credentials',
                success : false,
                status : 400
            }
        }
        const isPasswordCorrect = await bcrypt.compare(password , existingUser.password)
        if (!isPasswordCorrect) {
            return {
                error : 'Invalid credentials',
                success : false,
                status : 400
            }
        }
        const cookiesStore = await cookies() 
        const token = jwt.sign({
            id : existingUser.id
        } , process.env.JWT_SECRET as string , {
            expiresIn : '1d'
        })
        cookiesStore.set('todo-app-token' , token , {
            path : '/',
            httpOnly : true,
            secure : true,
            sameSite : 'strict',
            maxAge : 60 * 60 * 24 * 7 // 1 week
        })
        revalidatePath('/')
        return {
            success : true,
            status : 200,
            message : 'User logged in successfully',
            user : {
                id : existingUser.id,
                name : existingUser.name,
                username : existingUser.username,
                email : existingUser.email,
                role : existingUser.role,
                tasks : existingUser.tasks
            }
        }
    } catch (error) {
        return {
            error : error instanceof Error ? error.message : 'Something went wrong',
            success : false,
            status : 500
        }
    }
}

export const getCurrentUser = async () => {
    try {
        const cookiesStore = await cookies() 
        const token = cookiesStore.get('todo-app-token')
        if (!token) {
            return {
                error : 'Unauthorized',
                success : false,
                status : 401
            }
        }
        const decodedToken = jwt.verify(token.value , process.env.JWT_SECRET as string) as {id : string}
        const user = await prisma.user.findUnique({
            where : {
                id : decodedToken.id
            },
            include : {
                tasks : true
            }
        })
        if (!user) {
            return {
                error : 'Unauthorized',
                success : false,
                status : 401
            }
        }
        return {
            success : true,
            status : 200,
            user : {
                id : user.id,
                name : user.name,
                username : user.username,
                email : user.email,
                role : user.role,
                tasks : user.tasks
            }
        }
    } catch (error) {
        return {
            error : error instanceof Error ? error.message : 'Something went wrong',
            success : false,
            status : 500
        }
    }
}

export const logout = async ()=>{
    try {
        const cookiesStore = await cookies() 
        cookiesStore.delete('todo-app-token')
        revalidatePath('/')
        return {
            success : true,
            status : 200,
            message : 'User logged out successfully'
        }
    } catch (error) {
       return {
           error : error instanceof Error ? error.message : 'Something went wrong',
           success : false,
           status : 500
       } 
    }
}