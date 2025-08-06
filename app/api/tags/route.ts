import { getUsedTags } from "@/lib/content";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tags = getUsedTags();
    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}
