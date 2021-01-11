import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import mikroORMconfig from "./mikro-orm.config";
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { isProd } from "./constants";
import cors from 'cors'


const main = async () => {
  const orm = await MikroORM.init(mikroORMconfig);
  await orm.getMigrator().up();
  const app = express()

  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }))

  app.use(
    session({
      name: 'redid',
      store: new RedisStore({
        client: redisClient,
        disableTouch: true
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: 'lax',
        secure: isProd, //only work in https
      },
      saveUninitialized: false,
      secret: 'Qssw23aWbvo3aoT',
      resave: false,
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res })
  })

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("Listening on port 4000")
  })
}
main().catch(err => {
  console.log(err)
})