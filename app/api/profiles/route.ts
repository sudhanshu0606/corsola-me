import { NextResponse } from "next/server";

import { whisper } from "@/lib/whisper";
import { useUserModel } from "@/models";

const PRIMARY_MONGO_DB = process.env.PRIMARY_MONGO_DB_NAME as string;

export async function POST(request: Request) {

    try {

        const { profiles } = await request.json();

        if (
            !profiles ||
            typeof profiles !== "object" ||
            Array.isArray(profiles) ||
            Object.values(profiles).some(
                val => !Array.isArray(val) || !val.every(v => typeof v === 'string')
            )
        ) {
            return NextResponse.json(
                { message: "Invalid profile format" },
                { status: 400 }
            );
        }

        const userId = request.headers.get('x-user-id');

        const User = await useUserModel(PRIMARY_MONGO_DB);

        const updatedProfiles = await User.findOneAndUpdate(
            { uuid: userId },
            { $set: { profiles } },
            { new: true, upsert: true }
        );

        if (!updatedProfiles) {
            return NextResponse.json(
                { message: "Unable to update profiles" },
                { status: 400 }
            );
        }

        return NextResponse.json({}, { status: 200 });

    } catch (error) {

        whisper("Execution Error: ", error);

        return NextResponse.json(
            { message: "Oops! Something went wrong on our end. Please try again later or contact support if the issue persists." },
            { status: 500 }
        );

    }

}
