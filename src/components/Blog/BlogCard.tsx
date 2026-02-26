import type {Blogs} from "../../types/Blogs.ts";
import styles from "./BlogCard.module.css";

interface BlogCardProps {
    blog : Blogs;
}

const BlogCard = ({blog} : BlogCardProps) => {

    return (
        <div className={styles.card}>
            <div>
                <img src={blog.thumbnail_url} className={styles.thumbnail}/>
            </div>

            <div className={styles.content}>
                <p className={styles.blog_title}>{blog.title}</p>
                <p className={styles.description}>{blog.date}</p>
                <p>slug : {blog.slug}</p>
            </div>
        </div>
    )
}

export default BlogCard;