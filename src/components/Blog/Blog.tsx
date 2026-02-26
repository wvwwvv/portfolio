import styles from './Blog.module.css'
import {useQuery} from "@tanstack/react-query";
import {supabase} from "../../api/supabase.ts";
import type {Blogs} from "../../types/Blogs.ts";
import BlogCard from "./BlogCard.tsx";

const Blog = () => {

    const {data: blogs, isLoading, error} = useQuery<Blogs[]>({
        queryKey: ['blogs'],
        queryFn: async () => {
            const {data, error} = await supabase
                .from('blog')
                .select('*')
            if (error) throw error;
            return data;
        }
    });

    if (isLoading) return <p>로딩 중...</p>;
    if (error) return <p>에러가 발생했습니다.</p>;

    return (

        <section id="blog" className={styles.section}>
            <h1 className={styles.title}>Blog</h1>

            <div className={styles.blog_container}>
                {blogs
                    ?.map((item) => (
                        <BlogCard key={item.id} blog={item} />
                    ))}
            </div>


        </section>
    );
};

export default Blog;