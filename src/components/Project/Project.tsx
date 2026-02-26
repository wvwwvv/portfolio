import styles from './Project.module.css'
import {useQuery} from "@tanstack/react-query";
import {supabase} from "../../api/supabase.ts";
import type {Project} from "../../types/Projects.ts";

const Project = () => {

    const {data: projects, isLoading, error} = useQuery<Project[]>({
        queryKey: ['projects'],
        queryFn: async () => {
            const {data, error} = await supabase
                .from('project')
                .select('*')
            if (error) throw error;
            return data;
        }
    });

    if (isLoading) return <p>로딩 중...</p>;
    if (error) return <p>에러가 발생했습니다.</p>;

    return (

        <section id="project" className={styles.section}>
            <h1 className={styles.title}>Projects</h1>

            <div className={styles.all_contents}>
                {projects
                    ?.map((item, index) => (

                         /* 한 프로젝트 설명 전체, even 번째 프로젝트면 오른쪽 끝에 맞춤 */
                         <div key={item.id} className={index % 2 === 0 ? styles.content_even : styles.content_odd}>
                             <div className={styles.texts}> {/*이미지 좌측. 제목과 설명*/}
                                 <p className={styles.project_title}>{item.title}</p>
                                 <p className={styles.description}>{item.description}</p>
                             </div>
                             <img src={item.thumbnail_url}
                                  className={styles.thumbnail}
                                  style={{width : 240, height: 200}}
                             />
                         </div>

                    ))}
            </div>
        </section>
    );
};

export default Project;