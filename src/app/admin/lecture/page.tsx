"use client";
import { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";

export default function NewCoursePage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [tags, setTags] = useState("");

    const notify_success = (e: string) =>
        toast.success(e, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Slide,
        });

    const notify_error = (e: string) =>
        toast.error(e, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Slide,
        });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const tagsArray = tags
            .split(",") // 쉼표로 구분
            .map(tag => tag.trim()) // 공백 제거
            .filter(tag => tag.length > 0); // 빈 값 제거

        if (!title) {
            notify_error("제목을 입력해주세요.");
            return;
        }

        if (!description) {
            notify_error("설명을 입력해주세요.");
            return;
        }

        if (!thumbnailUrl) {
            notify_error("썸네일 URL을 입력해주세요.");
            return;
        }

        try {
            const response = await fetch("/api/courses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, thumbnailUrl, tags: tagsArray }),
            });

            const result = await response.json();

            if (response.ok) {
                notify_success("강좌 추가 성공!");
                setTitle("");
                setDescription("");
                setThumbnailUrl("");
                setTags("");
            } else {
                notify_error(result.error || "강좌 추가 실패!");
            }
        } catch (error) {
            notify_error("서버와의 연결에 문제가 발생했습니다.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md w-96 rounded-xl">
                <h2 className="text-xl font-bold mb-4">새 강좌 추가</h2>
                <input
                    type="text"
                    placeholder="강좌 제목"
                    className="input mb-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="설명"
                    className="input mb-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="썸네일 URL"
                    className="input mb-2"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="태그 (쉼표로 구분)"
                    className="input mb-4"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <button type="submit" className="btn-primary w-full bg-gray-200 p-2 rounded-lg">추가</button>
            </form>

            <ToastContainer />
        </div>
    );
}
