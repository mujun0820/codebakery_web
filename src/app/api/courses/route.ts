import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 강의 목록 불러오기
export async function GET() {
    try {
        const courses = await prisma.course.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(courses);
    } catch (error) {
        return NextResponse.json({ error: "데이터를 가져올 수 없습니다." }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { title, description, thumbnailUrl, tags } = await req.json();

        if (!title) {
            return NextResponse.json({ error: "제목은 필수입니다." }, { status: 400 });
        }

        const newCourse = await prisma.course.create({
            data: {
                title,
                description,
                thumbnailUrl,
                tags, // ✅ 이미 배열로 변환되었기 때문에 그대로 저장
            },
        });

        return NextResponse.json(newCourse, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "강의를 추가할 수 없습니다." }, { status: 500 });
    }
}
