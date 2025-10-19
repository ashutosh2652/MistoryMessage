import dbconnect from "@/lib/dbConnect";
import UserModal from "@/models/User";

export async function POST(request: Request) {
	await dbconnect();
	try {
		const { username, code } = await request.json();
		const decodeUsername = decodeURIComponent(username); //use for encode url not need here
		const user = await UserModal.findOne({ username: decodeUsername });
		if (!user) {
			return Response.json(
				{
					success: false,
					message: "User not found",
				},
				{ status: 400 }
			);
		}
		const isCodeValid = user.verifytoken == code;
		const tokennotExpired = new Date(user.verifytokenexpiry) > new Date();
		if (isCodeValid && tokennotExpired) {
			user.isVerified = true;
			await user.save();
			return Response.json(
				{ success: true, message: "Account verified successfully!" },
				{ status: 200 }
			);
		} else if (!tokennotExpired) {
			return Response.json(
				{
					success: false,
					message: "Verified token has expired please signup again!",
				},
				{ status: 400 }
			);
		} else {
			return Response.json(
				{
					success: false,
					message: "Incorrect verification code",
				},
				{ status: 400 }
			);
		}
	} catch (error) {
		console.error("Error verifying user", error);
		return Response.json(
			{
				success: false,
				message: "Error verifying user",
			},
			{ status: 500 }
		);
	}
}
