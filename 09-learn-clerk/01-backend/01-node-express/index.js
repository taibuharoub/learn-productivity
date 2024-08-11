import "dotenv/config";
import {
  ClerkExpressRequireAuth,
  ClerkExpressWithAuth,
  createClerkClient,
} from "@clerk/clerk-sdk-node";
import express from "express";

const port = process.env.PORT || 3000;

const app = express();

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  // apiUrl: "https://api.clerk.com",
  apiUrl: process.env.CLERK_API_URL,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Clerk Authentication" });
});

// Use the lax middleware that returns an empty auth object when unauthenticated
app.get(
  "/protected-endpoint",
  ClerkExpressWithAuth({
    // Add options here
    // See the Middleware options section for more details
  }),
  (req, res) => {
    res.json(req.auth);
  }
);

// Use the strict middleware that raises an error when unauthenticated
// app.get(
//   "/protected-endpoint",
//   ClerkExpressRequireAuth({
//     // Add options here
//     // See the Middleware options section for more details
//   }),
//   (req, res) => {
//     res.json(req.auth);
//   }
// );

app.get("/clients", async (req, res) => {
  try {
    const { data: userList } = await clerkClient.users.getUserList();
    console.log("🚀 ~ app.get ~ userList:", userList);

    res.status(200).json({ users: userList });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: error.message });
  }
});

app.post("/signup", async (req, res) => {
  const { emailAddress, password } = req.body;
  console.log("🚀 ~ app.post ~ emailAddress:", emailAddress);

  if (!emailAddress || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    // const newUser = await clerkClient.users.createUser({
    //   emailAddress,
    //   phoneNumber: ["+15555555555"],
    //   externalId: "a-unique-id",
    //   firstName: "Test",
    //   lastName: "Test",
    //   username: "test001",
    //   publicMetadata: {
    //     gender: "female",
    //   },
    //   privateMetadata: {
    //     middleName: "Test",
    //   },
    //   unsafeMetadata: {
    //     unsafe: "metadata",
    //   },
    //   password,
    // });
    // console.log("🚀 ~ app.post ~ newUser:", newUser);

    const createdUser = await clerkClient.users.createUser({
      emailAddress: [`${emailAddress}`],
      //   phoneNumber: ["+256780326120"],
      externalId: "a-unique-id",
      firstName: "Ty",
      lastName: "Haro",
      username: "test001",
      publicMetadata: {
        gender: "female",
      },
      privateMetadata: {
        middleName: "Test",
      },
      unsafeMetadata: {
        unsafe: "metadata",
      },
      password: "123456+ABCd",
    });

    res.status(200).json({ message: "Created Successfully..." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
