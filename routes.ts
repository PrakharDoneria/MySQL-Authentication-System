import { Router } from "./deps.ts";
import client from "./config.ts";
import { hash, verify } from "./deps.ts";

const router = new Router();

router
  .post("/register", async (ctx) => {
    const { email, username, password } = await ctx.request.body().value;

    const existingUser = await client.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username]
    );

    if (existingUser.length > 0) {
      ctx.response.body = { message: "Email or username already in use!" };
      return;
    }

    const hashedPassword = await hash(password);
    await client.execute(
      "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
      [email, username, hashedPassword]
    );

    ctx.response.body = { message: "User registered successfully!" };
  })
  .post("/login", async (ctx) => {
    const { email, username, password } = await ctx.request.body().value;

    const result = await client.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username]
    );

    if (result.length === 0) {
      ctx.response.body = { message: "User not found!" };
      return;
    }

    const user = result[0];
    const isPasswordCorrect = await verify(password, user.password);

    if (!isPasswordCorrect) {
      ctx.response.body = { message: "Invalid password!" };
      return;
    }

    ctx.response.body = { message: "Login successful!" };
  });

export default router;
