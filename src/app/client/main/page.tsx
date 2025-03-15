"use client";
import { useEffect, useState } from "react";
import LectureCard from "@/app/components/LectureCard";

interface Course {
    id: number;
    title: string;
    description: string;
    tags: string[];  // ✅ 여러 개의 태그를 저장할 경우
    thumbnailUrl: string;
}

export default function Home() {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        fetch("/api/courses")
            .then((res) => res.json())
            .then((data) => setCourses(data))
            .catch((err) => console.error("데이터 가져오기 실패:", err));
    }, []);

    return (
        <div className="justify-center min-h-screen bg-gray-100 p-10 px-[10vw]">
            {/* 추천 강의 섹션 */}
            <div className="mb-20">
                <div className="font-semibold text-2xl mb-4">추천 강의</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {courses.map((course) => (
                        <LectureCard
                            key={course.id}
                            thumbnail={course.thumbnailUrl}
                            title={course.title}
                            description={course.description}
                            tag={course.tags ? course.tags.join(", ") : "기본 태그"}  // ✅ 여러 개의 태그 지원
                        />
                    ))}
                </div>
            </div>

            {/* MD 추천 섹션 */}
            <div className="mb-20">
                <div className="font-semibold text-2xl mb-4">MD 추천</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {courses.map((course) => (
                        <LectureCard
                            key={course.id}
                            thumbnail={course.thumbnailUrl}
                            title={course.title}
                            description={course.description}
                            tag={course.tags ? course.tags.join(", ") : "추천 태그"}  // ✅ 여러 개의 태그 지원
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
