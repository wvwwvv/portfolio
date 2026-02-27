import styles from './Blog.module.css'
import {useQuery} from "@tanstack/react-query";
import {supabase} from "../../api/supabase.ts";
import type {Blogs} from "../../types/Blogs.ts";
import BlogCard from "./BlogCard.tsx";
import {useNavigate} from "react-router-dom";
import {useRef} from "react";

const Blog = () => {

    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);

    const {data: blogs, isLoading, error} = useQuery<Blogs[]>({
        queryKey: ['blogs'],
        queryFn: async () => {
            const {data, error} = await supabase
                .from('blog')
                .select('*')
                .order('id', {ascending: true});
            if (error) throw error;
            return data;
        }
    });

    // scroll 제어
    const handleScroll = (dir : 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 400; // 카드 넓이 정도로
            scrollRef.current.scrollBy({
                left : dir === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    if (isLoading) return <p>로딩 중...</p>;
    if (error) return <p>에러가 발생했습니다.</p>;

    return (

        <section id="blog" className={styles.section}>
            <h1 className={styles.title}>Blog</h1>

            <div className={styles.wrapper}>
                {/* 왼쪽 스크롤 화살표 버튼 */}
                <div
                    className={styles.left_arrow}
                    onClick={() => handleScroll('left')}
                >
                </div>

                {/* blog card 들 */}
                <div className={styles.blog_container} ref={scrollRef}>
                    {blogs
                        ?.map((item) => (
                            <div onClick={() => navigate(`/blogs/${item.slug}`)}>
                                <BlogCard key={item.id} blog={item}/>
                            </div>
                        ))}
                </div>

                {/* 오른쪽 스크롤 화살표 버튼 */}
                <div
                    className={styles.right_arrow}
                    onClick={() => handleScroll('right')}
                >
                </div>
            </div>


        </section>
    );
};

export default Blog;