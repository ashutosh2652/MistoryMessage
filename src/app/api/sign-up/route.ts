import { sendVerificationEmail } from "@/helpers/sendVerificationemail";
import dbconnect from "@/lib/dbConnect";
import UserModal from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
	await dbconnect();

	try {
		const { email, password, username } = await request.json();
		const existingUserVerifiedByUsername = await UserModal.findOne({
			username,
			isVerified: true,
		});
		if (existingUserVerifiedByUsername) {
			return Response.json(
				{
					success: false,
					message:
						"Username already exist please try with anothere username!",
				},
				{ status: 409 }
			);
		}
		const existingUserByEmail = await UserModal.findOne({ email });
		const verificationcode = Math.floor(
			90000 + Math.random() * 10000
		).toString();
		if (existingUserByEmail) {
			if (existingUserByEmail.isVerified) {
				return Response.json(
					{
						success: false,
						message: "User already exist with this email!",
					},
					{ status: 400 }
				);
			} else {
				const hashedPassword = await bcrypt.hash(password, 10);
				existingUserByEmail.password = hashedPassword;
				existingUserByEmail.verifytoken = verificationcode;
				existingUserByEmail.verifytokenexpiry = new Date(
					Date.now() + 60 * 60 * 1000
				);
				await existingUserByEmail.save();
			}
		} else {
			const hashedPassword = await bcrypt.hash(password, 10);
			const expiryDate = new Date();
			expiryDate.setHours(expiryDate.getHours() + 1);
			const newUser = new UserModal({
				username,
				email,
				password: hashedPassword,
				verifytoken: verificationcode,
				verifytokenexpiry: expiryDate,
				isVerified: false,
				isAcceptingMessages: true,
				message: [],
			});
			await newUser.save();
		}
		const emailResponse = await sendVerificationEmail(
			email,
			username,
			verificationcode
		);
		if (!emailResponse.success) {
			return Response.json(
				{ success: false, message: emailResponse.message },
				{ status: 500 }
			);
		}
		return Response.json(
			{
				success: true,
				message:
					"User registered successfully.Please verify your email",
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error registering user!", error);

		return Response.json(
			{
				success: false,
				message: "Error registering user!",
			},
			{
				status: 500,
			}
		);
	}
}
