import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {supabase} from "../../api/supabase.ts";
import type {Projects} from "../../types/Projects.ts";
import styles from './ProjectDetail.module.css'


const ProjectDetail = () => {
    const {id} = useParams<{ id: string }>(); // url 에서 id 추출
    const navigate = useNavigate();

    const {data: project, isLoading} = useQuery<Projects>({
        queryKey: ['project', id], /* url 에서 추출한 id 로 쿼리 생성 */
        queryFn: async () => {
            const {data, error} = await supabase
                .from('project')
                .select('*')
                .eq('id', id)
                .single(); // 특정 ID 하나만 가져올 때 single 사용 (그렇지 않으면 요소가 1개더라도 기본으로 배열로 가져오게 되므로 배열 벗기는 작업이 필요함)
            if (error) throw error;
            return data;
        }
    });

    /* 사용할 때에 to 에 project 값 넣어서 사용 */
    const handleClick = (to: String) => {
        navigate('/', {state: {scrollTo: to}});
    };

    if (isLoading) return <p>상세 정보를 불러오는 중...</p>;
    if (!project) return <p>프로젝트를 찾을 수 없습니다.</p>;

    return (
        <section className={styles.section}>

            {/* 뒤로가기와 제목 */}
            <div className={styles.title_head}>
                <div onClick={() => handleClick('project')} className={styles.back_button}></div>
                <p className={styles.title}> {project?.title}</p>
            </div>

            <div className={styles.all_contents}>
                <p className={styles.content_title}>프로젝트 소개</p>
                <p className={styles.content_text}>{project.description}</p>
                <p className={styles.content_title}>프로젝트 기간</p>
                <p className={styles.content_text}>{project.period}</p>
                <p className={styles.content_title}>맡은 역할</p>
                <p className={styles.content_text}>{project.role}</p>
                <p className={styles.content_title}>사용 기술</p>
                <p className={styles.content_text}>{project.skill}</p>


                {/* 상세 이미지들 출력 */}
                <div className={styles.images_container}>
                    {project.detail_images?.map((url, idx) => (
                        <img src={url} alt={`detail-${idx}`} className={styles.detail_image}/>
                    ))}
                </div>

                <div
                    onClick={() => handleClick('project')}
                    className={styles.back_button_text}
                >뒤로가기</div>
            </div>
        </section>
    );
};


export default ProjectDetail;

