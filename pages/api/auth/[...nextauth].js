import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";
import bcrypt from "bcryptjs";

dbConnect();

export default NextAuth({
  secret: process.env.JWT_SECRET,
  providers: [],
});
