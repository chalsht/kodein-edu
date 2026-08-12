import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request){

const {searchParams}=new URL(request.url);

const email=searchParams.get("email");

const [rows]=await db.execute(

`SELECT

sertifikat.*

FROM sertifikat

JOIN users

ON sertifikat.user_id=users.id

WHERE users.email=?`,

[email]

);

return NextResponse.json(rows);

}