import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter";
import Sequelize, { DataTypes } from "sequelize";
import pg from "pg";
/* import User from "../models/User"; */

const sequelize = new Sequelize(`${process.env.CONNECTION_STRING}`, {
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
/* 
sequelize.sync({ alter: true }); */

/* console.log("sequelize", sequelize); */

console.log("HERE ARE THE models", models);

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: SequelizeAdapter(sequelize, {
    models: {
      User: sequelize.define("oauthuser", { ...models.User }),
      Account: sequelize.define("account", {
        ...models.Account,

        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "oauthusers",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT",
        },
      }),
      Session: sequelize.define("session", {
        ...models.Session,
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "oauthusers",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT",
        },
      }),
    },
  }),

  debug: true,
  callbacks: {
    async signIn(callback) {
      console.log("CALLBBACK SIGNIN callback", callback);
      if (callback.account.provider === "github") {
        console.log("I AM THE GITHUB PROVIDER");

        let user = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/email/${callback.user.email}`
        )
          .then((response) =>
            response
              .json()
              .then(async (responseJson) => {
                if (responseJson?.user) {
                  console.log(
                    "I AM THE GITHUB PROVIDER AND FOUND A USER",
                    responseJson.user
                  );
                } else {
                  const firstName = callback.profile.name.split(" ").length
                    ? callback.profile.name.split(" ")[0]
                    : callback.profile.login;

                  const lastName = callback.profile.name.split(" ").length
                    ? callback.profile.name.split(" ").length > 1
                      ? callback.profile.name.split(" ")[1]
                      : callback.profile.login
                    : callback.profile.login;

                  let newUser = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/`,
                    {
                      method: "post",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        first_name: firstName,
                        last_name: lastName,
                        email: callback.user.email,
                        image: callback.profile.avatar_url,
                      }),
                    }
                  );
                  console.log(
                    newUser,
                    "newUser mit irgendeinem Text damit man das erkennt"
                  );
                }
              })
              .catch((e) => {
                console.log(e, "error in callback1");
              })
          )
          .catch((e) => {
            console.log(e, "error in callback2");
          });

        console.log(user, "__________________- Das ist das Ende");
      }
      return true;
    },

    async session(session, user) {
      console.log("SESSION STARTED session: ", session);
      console.log("SESSION STARTED user: ", user);

      let foundUser = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/email/${session.user.email}`
      ).then((response) =>
        response.json().then(async (responseJson) => {
          if (responseJson?.user) {
            console.log(
              "Sessioncallback -> FOUND USER IN DB",
              responseJson.user
            );
            return responseJson.user;
          } else {
            return null;
          }
        })
      );

      console.log(foundUser, "dieser user ist es");
      session.frontendUser = foundUser; // users table
      return session;
    },
    /*   async session(session, user) {
      const dbUser = await UserModel.findOne({
        where: { oauth_user_id: user.id },
      });
      session.user = dbUser ? dbUser.dataValues : null;
      return session;
    }, */
    /*  async createUser(user, options) {
      const { name, email, image } = user;
      console.log("THIS IS MY USER", user);
      console.log("THIS IS MY options", options);

      const oauth_user_id = user.sub; 
      const newUser = await models.User.create({
        name,
        email,
        image,
        oauth_user_id,
      });
      return newUser;
    }, */
  },
  events: {
    signIn: async (callbackUrl) => {
      console.log("Signed in from", callbackUrl);
    },
    createUser: async (callbackUrl) => {
      console.log("Created account from", callbackUrl);
    },
  },
};

export default NextAuth(authOptions);

/* User: sequelize.define("user", {
        ...models.User,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
      }), */
/* ...models, */
