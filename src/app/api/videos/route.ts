import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://u6g0dlfkq2.execute-api.us-east-1.amazonaws.com/prod/get-all-videos"
    );

    if (!res.ok) {
      throw new Error(`API request failed with status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Fetched Videos:", data); // 🐛 Debugging log

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: "Unexpected API response format" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching videos:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch videos",
      },
      { status: 500 }
    );
  }
}
