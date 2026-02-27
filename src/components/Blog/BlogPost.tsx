import styles from "./BlogPost.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import ReactMarkdown from 'react-markdown';
import type {Blogs} from "../../types/Blogs.ts";
import {supabase} from "../../api/supabase.ts";
import {useEffect, useState} from "react";

const BlogPost = () => {

    // slug 은 public 의 md 파일 이름인데 당연히 unique 라고 생각해야되나?
    // id가 아닌 slug로 db에서 row 가져올건데
    const {slug} = useParams<{ slug: string }>(); // url 에서 slug 추출
    const navigate = useNavigate();
    const [content, setContent] = useState(''); // md 내용
    const [loadingMd, setLoadingMd] =useState(true);

    // 뒤로가기
    const handleClick = (to: String) => {
        navigate('/', {state: {scrollTo: to}});
    };

    // db 조회
    const {data: blog, isLoading, error} = useQuery<Blogs>({
        queryKey: ['blogDetail', slug],
        queryFn: async() => {
            const {data, error} = await supabase
                .from('blog')
                .select('*')
                .eq('slug', slug)
                .single();
            if (error) throw error;
            return data;
        }
    });

    // slug.md 의 텍스트 content 에 저장
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/posts/${slug}.md`); // public dir 니까 바로 접근?
                if (!response.ok) throw new Error('Not found');
                const text = await response.text();
                setContent(text);

            } catch {
                setContent('');
            } finally {
                setLoadingMd(false);
            }
        };

        fetchPost();
    }, [slug]);


    if (isLoading || loadingMd) return <p>로딩 중...</p>;
    if (error) return <p>블로그 세부 정보를 불러오지 못했습니다.</p>;

    return (
        <section className={styles.section}>
            <div className={styles.title_head}>
                <div onClick={() => handleClick('blog')} className={styles.back_button}></div>
                <p className={styles.blog_title}> {blog?.title}</p>
            </div>
            <p className={styles.blog_date}> {blog?.date}</p>
            <div className={styles.blog_contents}>
                {/* npm install react-markdown remark-gfm rehype-raw 세부 기능까지 한번에 install */}
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </section>
    )
}

export default BlogPost;