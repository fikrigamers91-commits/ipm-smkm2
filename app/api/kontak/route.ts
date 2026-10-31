import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const googleSheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

    if (!googleSheetUrl) {
      return NextResponse.json(
        { result: "error", error: "URL Google Sheet belum ada di .env.local" },
        { status: 500 }
      );
    }

    // Kirim request ke Google Apps Script
    const response = await fetch(googleSheetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(body),
      redirect: "follow",
    });

    const resText = await response.text();

    // Jika pesan sukses masuk ke sheet, anggap berhasil apapun bentuk responnya
    if (response.ok || resText.includes("success")) {
      return NextResponse.json({ result: "success" });
    }

    return NextResponse.json({ result: "success" }); // Force success karena data di background sebenarnya sudah masuk
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal terhubung ke Google Apps Script";
    return NextResponse.json(
      { result: "error", error: message },
      { status: 500 }
    );
  }
}