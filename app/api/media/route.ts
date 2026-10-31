import { NextResponse } from "next/server";

export async function GET() {
  try {
    const googleSheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

    if (!googleSheetUrl) {
      return NextResponse.json({ result: "error", data: [] }, { status: 500 });
    }

    // Server Next.js memanggil Google Apps Script (Bebas dari masalah CORS Browser)
    const response = await fetch(googleSheetUrl, { cache: "no-store" });
    const json = await response.json();

    return NextResponse.json(json);
  } catch (error) {
    console.error("API Media Route Error:", error);
    return NextResponse.json({ result: "error", data: [] }, { status: 500 });
  }
}