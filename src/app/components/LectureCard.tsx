import Image from "next/image";

interface LectureCardProps {
    thumbnail: string;
    title: string;
    description: string;
    tag: string;
}

export default function LectureCard({ thumbnail, title, description, tag }: LectureCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-sm h-88">
            {/* 썸네일 이미지 */}
            <div className="relative w-full h-48 bg-gray-200">
                <Image
                    src={thumbnail}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-xl"
                    draggable="false"  // ✅ 드래그 방지

                />
            </div>

            {/* 강의 정보 */}
            <div className="p-4">
                <h2 className="text-xl font-bold">{title}</h2>

                {/* 태그 */}
                <div className="mt-2 flex justify-between items-center">
                    <hr className="flex-grow border-gray-300" />
                    <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full ml-2">
            #{tag}
          </span>
                </div>

                {/* 설명 */}
                <p className="mt-2 text-gray-600">{description}</p>
            </div>
        </div>
    );
}
