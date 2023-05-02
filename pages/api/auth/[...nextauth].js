import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter";
import Sequelize, { DataTypes } from "sequelize";
/* import User from "../models/User"; */

const sequelize = new Sequelize(`${process.env.CONNECTION_STRING}`, {
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

/* const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
); */

/* const Account = sequelize.define("Account", {
  provider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  providerAccountId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refresh_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accessTokenExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}); */

/* const Account = sequelize.define("account", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
}); */

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      /* async authorize(credentials, req) {
        const { tokens } = credentials;
        const profile = await this.fetchProfile(tokens.accessToken);
        console.log("I AM STARTING THE AUTHORIZE OF GITHUB NOW! credentials");
        console.log("----------credentials", credentials);
        console.log("----------credentials", tokens);
        console.log("----------credentials", profile);

        if (!profile) {
          throw new Error("GitHub-Profile nicht verfügbar");
        }

        let user = await UserModel.findOne({
          where: { oauth_user_id: profile.id },
        });

        console.log("FOUND USER: ", user);

        if (!user) {
          user = await UserModel.create({
            oauth_user_id: profile.id,
            name: profile.name,
            email: profile.email,
            image: profile.image,
          });
        }

        console.log("USER IS NOW (AFTER POTENTIAL CREATION): ", user);

        return {
          id: user.oauth_user_id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      }, */
    }),
  ],
  adapter: SequelizeAdapter(sequelize, {
    models: {
      User: sequelize.define(
        "oauthuser",
        { ...models.User }
        /* id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        oauth_user_id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          unique: true,
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        pref_remote: DataTypes.BOOLEAN,
        pref_company_size: DataTypes.INTEGER,
        pref_sector: DataTypes.STRING,
        description: DataTypes.STRING, */
        /*   }  */
        /* { timestamps: true, created: "created_at", updated: "updated_at" } */
      ),
      Account: sequelize.define("account", {
        ...models.Account,
        /*    id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        }, */
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

  /* adapter: SequelizeAdapter(sequelize, {
    models: {
     
      User,
    },
  }), */
  debug: true,
  callbacks: {
    /*   async signIn(user, account, profile) {
      console.log("CALLBBACK SIGNIN user", user)
      console.log("CALLBBACK SIGNIN user", user)
      console.log("CALLBBACK SIGNIN user", user)

      if (account.provider === "github") {
        user.oauth_user_id = profile.id;
      }
      return true;
    }, */
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

        /*    const adapter = this.adapter;
        const UserModel = adapter.models.User;

        let dbUser = await UserModel.findOne({
          where: { oauth_user_id: callback.profile.id },
        });

        console.log("MY FOUND USER IS dbUser: ", dbUser);

        if (!dbUser) {
          console.log("I AM CREATING THE USER");
          dbUser = await UserModel.create({
            oauth_user_id: callback.profile.id,
            name: callback.user.name,
            email: callback.user.email,
            image: callback.user.image,
          });
        }

        console.log("MY USER IS NOW dbUser: ", dbUser); */

        // Aktualisiere das user-Objekt mit den gefundenen oder erstellten Benutzerdaten
        /*      callback.user.id = dbUser.oauth_user_id;
        callback.user.name = dbUser.name;
        callback.user.email = dbUser.email;
        callback.user.image = dbUser.image; */
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
