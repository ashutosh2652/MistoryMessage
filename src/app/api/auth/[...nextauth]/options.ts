import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbconnect from "@/lib/dbConnect";
import UserModal from "@/models/User";

export const authOptions: NextAuthOptions = {};
