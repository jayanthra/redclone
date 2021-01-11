import { User } from "../entities/User";
import { Resolver, Ctx, ObjectType, Arg, Mutation, InputType, Field, Query } from "type-graphql";
import { MyContext } from "src/types";
import argon2 from "argon2";



@InputType()
class UserRegisterInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class InputError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [InputError], { nullable: true })
  errors?: InputError[]
}

@Resolver()
export class UserResolver {

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UserRegisterInput,
    @Ctx() { em }: MyContext): Promise<UserResponse> {

    if (options.username.length < 6) {
      return {
        errors: [{
          field: 'username',
          message: 'username must be more than 6 characters',
        }]
      }
    }

    const hashedPassword = await argon2.hash(options.password)
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword
    })
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.detail.includes('already exists')) {
        return {
          errors: [{
            field: 'username',
            message: 'username already exists',
          }]
        }
      }
    }
    return { user }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UserRegisterInput,
    @Ctx() { em, req }: MyContext): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username })
    if (!user) {
      return {
        errors: [{
          field: 'username',
          message: 'could not find username',
        }]
      }
    }
    const passwordVerified = await argon2.verify(user.password, options.password)
    if (!passwordVerified) {
      return {
        errors: [{
          field: 'password',
          message: 'incorrect password',
        }]
      }
    }
    req.session.userId = user.id

    console.log("LOGOI REQ", req.session)

    return {
      user
    }
  }

  @Query(() => User, {nullable: true})
  async me(@Ctx() { req, em }: MyContext) {
    console.log("ME REQ", req.session)
    if(!req.session.userId) {
      return null
    }else {
      const user = await em.findOne(User, {id: req.session.userId})
      return user
    }
  }


}