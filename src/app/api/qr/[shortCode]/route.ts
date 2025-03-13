import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shortCode: string }> }) {
  try {
    const  shortCode =  (await params).shortCode;
    const normalizedShortCode = shortCode.replace(/\/+$/, "").toLowerCase();

    const url = await prisma.url.findUnique({
      where: { shortCode: normalizedShortCode },
    });
    const trialUrl = await prisma.trialUrl.findUnique({
      where: { shortCode: normalizedShortCode },
    });

    if (!url && !trialUrl) {
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }

    const qrCode = await QRCode.toDataURL(
      `${process.env.NEXT_PUBLIC_BASE_URL+"/"+normalizedShortCode}`
    ); 
    if (url) {
      await prisma.url.update({
        where: { shortCode: normalizedShortCode },
        data: { qrCode },
      });
    } else if (trialUrl) {
      await prisma.trialUrl.update({
        where: { shortCode: normalizedShortCode },
        data: { qrCode },
      });
    }
    return NextResponse.json({ qrCode });
  } catch  {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
