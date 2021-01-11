# Redclone
Redclone is a yet another reddit clone ¯\_(ツ)_/¯

### Techstack

- React
- TypeScript
- GraphQL
- URQL/Apollo
- Node.js
- PostgreSQL
- MikroORM/TypeORM
- Redis
- Next.js
- TypeGraphQL
- Chakra

### Installation

```sh
$ cd redclone
$ npm install 
$ yarn watch
$ yarn dev
```

#### Set up Postgresql
create migration

```sh
npx mikro-orm migration:create
```

#### Redis 

For windows use : https://github.com/ServiceStack/redis-windows

#### Libraries used

Argon2 [https://www.npmjs.com/package/argon2]  for Hashing
Express session [https://www.npmjs.com/package/connect-redis] for session

Graphql for FE : https://formidable.com/open-source/urql/docs/

#### GraphQl playground


open http://localhost:4000/graphql


#### Kubernetes + Google Cloud

See [KUBERNETES.md](https://github.com/joemccann/dillinger/blob/master/KUBERNETES.md)

License
----

MIT
