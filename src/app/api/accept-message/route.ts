import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbconnect from "@/lib/dbConnect";
import UserModal from "@/models/User";
import { User } from "next-auth";

export async function POST(request: Request) {
	await dbconnect();
	const session = await getServerSession(authOptions);
	if (!session || !session?.user) {
		return Response.json(
			{ success: false, message: "Not Authenticated" },
			{ status: 401 }
		);
	}
	const user: User = session?.user as User;
	const userId = user?._id;
	const { acceptMessages } = await request.json();
	try {
		const updatedUser = await UserModal.findByIdAndUpdate(
			userId,
			{
				isAcceptingMessages: acceptMessages,
			},
			{ new: true }
		);
		if (!updatedUser) {
			return Response.json(
				{
					success: false,
					message: "failed to update user status to accept messages",
				},
				{ status: 401 }
			);
		}
		return Response.json(
			{
				success: true,
				message: "Message acceptance status updated successfully!",
				updatedUser,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(
			"Error while updating the user status to accept messages",
			error
		);
		return Response.json(
			{
				success: false,
				message:
					"Error while updating the user status to accept messages",
			},
			{ status: 500 }
		);
	}
}

export async function GET(request: Request) {
	await dbconnect();
	const session = await getServerSession(authOptions);
	if (!session || !session?.user) {
		return Response.json(
			{ success: false, message: "Not Authenticated" },
			{ status: 401 }
		);
	}
	try {
		const user: User = session?.user as User;
		const userId = user?._id;
		const findUser = await UserModal.findById(userId);
		if (!findUser) {
			return Response.json(
				{ success: false, message: "User not found" },
				{ status: 404 }
			);
		}
		return Response.json(
			{
				success: true,
				isAcceptingMessages: findUser.isAcceptingMessages,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(
			"Error while updating the user status to accept messages",
			error
		);
		return Response.json(
			{
				success: false,
				message: "Error in getting message acceptance status",
			},
			{ status: 500 }
		);
	}
}
