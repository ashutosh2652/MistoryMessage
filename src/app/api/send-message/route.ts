import dbconnect from "@/lib/dbConnect";
import UserModal from "@/models/User";

import { Message } from "@/models/User";

export async function POST(request: Request) {
	await dbconnect();

	const { username, content } = await request.json();
	try {
		const user = await UserModal.findOne({ username });
		if (!user) {
			return Response.json(
				{ success: false, message: "User not found" },
				{ status: 404 }
			);
		}

		if (!user.isAcceptingMessages) {
			return Response.json(
				{ success: false, message: "User is not accepting messages" },
				{ status: 403 }
			);
		}
		const newMessages = { content, createdAt: new Date() };
		user.message.push(newMessages as Message);
		await user.save();
		return Response.json(
			{ success: true, message: "Message sent successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error adding messages: ", error);
		return Response.json(
			{ success: false, message: "Error occured while sending messages" },
			{ status: 500 }
		);
	}
}
