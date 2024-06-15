import db from '@/client';

export const getUserByEmail = async(email: any) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email
      }
    })
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null
  }
}

export const getUserByUsername = async(username: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        username: username
      },
      include: {
        following: true,
        followers: {
          include: {
            follower: true
          }
        },
        posts: {
          include: {
            author: true,
            likes: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null
  }
}

export const getPosts = async() => {
  try {
    const data = await db.post.findMany({
      include: {
        author: true,
        likes: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null
  }
}

export const getPostById = async(id: string) => {
  try {
    const data = await db.post.findUnique({
      where: {
        id: id
      },
      include: {
        author: true,
        likes: true
      }
    })
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null
  }
}

export const getCommentsByPostId = async(id: string) => {
  try {
    const data = await db.comment.findMany({
      where: {
        postId: id
      },
      include: {
        author: true
      },
      orderBy: {
        createdAt:'desc'
      }
    })
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null
  }
}

export const getLikesByPostId = async(id: string) => {
  try {
    const data = await db.like.findMany({
      where: {
        postId: id
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt:'desc'
      }
    })
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null
  }
}

export const getFollowers = async(username: string) => {
  try {
    const data = await db.follow.findMany({
      where: {
        following: {
          username: username
        }
      },
      include: {
        follower: true
      }
    })
    return data;
  } catch (error) {
    console.error('Failed to fetch followers', error);
    return null
  }
}


export const getFollowings = async(username: string) => {
  try {
    const data = await db.follow.findMany({
      where: {
        follower: {
          username: username
        }
      },
      include: {
        following: true
      }
    })
    return data;
  } catch (error) {
    console.error('Failed to fetch followings', error);
    return null
  }
}

