import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { executionArn } = await req.json();

    if (!executionArn) {
      return NextResponse.json(
        { error: "Missing executionArn" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      "https://yidffzn1xa.execute-api.us-east-1.amazonaws.com/v1/execution-status",
      { executionArn },
      { headers: { "Content-Type": "application/json" } }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching status:", error);
    return NextResponse.json(
      { error: "Failed to fetch status" },
      { status: 500 }
    );
  }
}
