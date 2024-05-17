'use server'

import { auth, signIn } from '@/auth';
import { AuthError, Session } from 'next-auth';
import db from '@/client';
import { getUserByEmail, getUserByUsername } from './data';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { SendResetEmailSchema, SignupFormSchema, UpdateDataFormSchema } from './zod-schema';
import { generateVerificationToken } from './tokens';
import { getVerificationTokenByToken } from './verification-token';

export async function authenticate(prevState: string | undefined,formData: FormData,) {
  const email: any =  formData.get('email')
  const password =  formData.get('password')

  const existingUser = await getUserByEmail(email.toLowerCase())
  
  if (!existingUser) {
    return "Email does not exist"
  }

  if(!existingUser.emailVerifed) {
    const verificationToken = await generateVerificationToken(existingUser.email)
    // await sendVerification(verificationToken.email, verificationToken.token)
    redirect(`/verify?token=${verificationToken.token}`);
  }

  try {
    await signIn('credentials', {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

type FormState =
  | {
      errors?: {
        name?: string[]
        username?: string[]
        email?: string[]
        password?: string[]
        dp?: string[]
      }
      message?: string
    }
  | undefined

export async function signUp (state: FormState, formData: FormData) {
   // Validate form fields
   const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    image: formData.get('image'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, password, username } = validatedFields.data

  const formattedUsername = username.replace(/\s/g, '_').toLowerCase()
  
  const existingWithEmail = await getUserByEmail(email);

  const existingWithUsername = await getUserByUsername(formattedUsername);

  if(existingWithEmail){
    return { error: "Email already in use! Please use another..."};
  }

  if(existingWithUsername){
    return { error: "Username already in use! Please use another..."};
  }

  const reqBody = new FormData()
  reqBody.append('file', validatedFields.data.image)
  reqBody.append('upload_preset', 'henryDB')

  const res = await fetch('https://api.cloudinary.com/v1_1/dfquzvx4n/image/upload',{
    method: 'POST',
    body: reqBody
  })
  const result = await res.json()
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await db.user.create({
    data: {
      name: name,
      username: formattedUsername,
      image:result.url,
      email: email.toLowerCase(),
      password: hashedPassword
    }
  })

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }
  const verificationToken = await generateVerificationToken(user.email)
  redirect(`/verify?token=${verificationToken.token}`);
}

export const createPost = async(post: string, userId: string) => {
  try {
    const data = await db.post.create({
      data: {
        content: post,
        authorId: userId
      }
    })
    revalidatePath('/home')
    return data
  } catch (error) {
    console.error('Failed to send post', error);
  }
}

export const deletePost = async(postId: string) => {
  console.log(postId)
  try {
    const deleteLikes = db.like.deleteMany({
      where: {
        postId: postId
      }
    })
    const deleteComments = db.comment.deleteMany({
      where: {
        postId: postId
      }
    })
    const deletePost = db.post.delete({
      where: {
        id: postId
      }
    })
    const transaction = await db.$transaction([deleteLikes,deleteComments, deletePost])
    return transaction;
  } catch (error) {
    console.error('Failed to send post', error);
  }
}

export const createComment = async(comment: string, userId: string, postId: string) => {
  try {
    const data = await db.comment.create({
      data: {
        content: comment,
        userId: userId,
        postId: postId
      }
    })
    return data
  } catch (error) {
    console.error('Failed to send comment', error);
  }
}

export const toggleLikePost = async(userId: string, postId: string) => {
  try {
    const post = await db.post.findFirst({
      where: {
        id: postId
      },
      include: {
        likes: true
      }
    })

    const ifLiked = post?.likes.find((like) => like.userId === userId)

    if (ifLiked) {
      const data = await db.like.delete({
        where: {
          id: ifLiked.id
        }
      })
      return data
    }else {
      const data = await db.like.create({
        data: {
          userId: userId,
          postId: postId
        }
      })
      return data
    }
  } catch (error) {
    console.error('Failed to like post', error);
  }
}

 
type UpdateDataFormState =
  | {
      errors?: {
        name?: string[]
        username?: string[]
        bio?: string[]
      }
    }
  | undefined

export async function updateData (state: UpdateDataFormState, formData: FormData) {
  const userSession: Session | null = await auth()
  const id = userSession?.user?.id
   // Validate form fields
   const validatedFields = UpdateDataFormSchema.safeParse({
    name: formData.get('name'),
    username: formData.get('username'),
    bio: formData.get('bio')
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, bio, username } = validatedFields.data

  const formattedUsername = username.replace(/\s/g, '_').toLowerCase()
  
  const existingUserWithUsername = await getUserByUsername(formattedUsername);

  if(existingUserWithUsername && existingUserWithUsername?.id !== id) {
    return { error: "Username already in use! Please use another..."};    
  }

  const user = await db.user.update({
    where: {
      id: id
    },
    data: {
      name: name,
      username: formattedUsername,
      bio: bio
    }
  })

  console.log(user)

  if (!user) {
    return {
      message: 'An error occurred while updating your account... Please try again',
    }
  }
  redirect(`/profile/${formattedUsername}`)
}

type ResetPasswordFormState =
  | {
      errors?: {
        email?: string[]
      }
      message?: string
    }
  | undefined

  
  export const verifyEmailWithToken = async(token: string) => {
  const existingToken = await getVerificationTokenByToken(token)

  if(!existingToken) {
    throw new Error('Token does not exist')
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if(hasExpired) {
    throw new Error('Token has expired')
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if(!existingUser) {
    throw new Error('Email does not exist') 
  }
  
  await db.user.update({
    where: {
      email: existingUser.email
    },
    data: {
      emailVerifed: true
    }
  })
  
  return 'Verification successful'
}

export async function sendResetMail (state: ResetPasswordFormState, formData: FormData) {
   const validatedFields = SendResetEmailSchema.safeParse({
    email: formData.get('email')
  })
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email } = validatedFields.data
  console.log(email.toLowerCase())
  const existingUser = await getUserByEmail(email.toLowerCase())
  
  if (!existingUser) {
    return {
      error: "Email does not exist"
    }
  }

  const verificationToken = await generateVerificationToken(existingUser.email)
  redirect(`/forgot-password/reset?token=${verificationToken.token}`);
}

export const resetPasswordWithToken = async(token: string, password: string) => {
  const existingToken = await getVerificationTokenByToken(token)

  if(!existingToken) {
    throw new Error('Token does not exist')
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if(hasExpired) {
    throw new Error('Token has expired')
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if(!existingUser) {
    throw new Error('Email does not exist') 
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: {
      email: existingUser.email
    },
    data: {
      password: hashedPassword
    }
  })

  return 'Password reset successful'
}