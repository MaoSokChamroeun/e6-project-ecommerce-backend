const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const bcrypt = require("bcryptjs");
const User = require("./model/user.model");
const connection = require("./database/dbConnection");

const run = async () => {
  try {
    // connect database
    await connection();
    // check if super admin exists
    const existSuper = await User.findOne({
      email: process.env.SUPER_EMAIL,
    });

    if (!existSuper) {
      console.log("Super admin not found, creating...");

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        process.env.SUPER_PASSWORD,
        salt
      );

      const data = {
        username : process.env.SUPER_ADMIN,
        email: process.env.SUPER_EMAIL,
        password: hashedPassword,
        role: "admin",
      };

      await User.create(data);

      console.log("✅ Seeding success: Super admin created.");
    } else {
      console.log("⚠️ Seeding skipped: Super admin already exists.");
    }

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

run();