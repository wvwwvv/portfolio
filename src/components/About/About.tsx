import {supabase} from "../../api/supabase.ts";
import {useQuery} from "@tanstack/react-query";
import type {Profile} from "../../types/Profile.ts";
import styles from './About.module.css'
import type {Experience} from "../../types/Experience.ts";


const About = () => {

    /* 포트폴리오 관리자의 프로필 정보 가져오기
    * 단 1개의 row 있다고 가정 */
    const {data: profile, isLoading : isProfileLoading, error : pError} = useQuery<Profile>({
        queryKey: ['profile'],
        queryFn: async () => {
            const {data, error} = await supabase
                .from('profile')
                .select('*')
                .single() // 일반적으로 배열 가져오는데 그 중 하나만 가져오려고
            if (error) throw error;
            return data; // data 객체 profile 에 반환
        }
    });

    /* 포트폴리오 관리자의 experience 테이블 정보 모두 불러오기
    * 일반적인 경우 *로 모두 불러오는건 배열로 저장 */
    const {data: experience, isLoading : isExperienceLoading, error: eError} = useQuery<Experience[]>({
        queryKey: ['experience'],
        queryFn: async () => {
            const {data, error} = await supabase
                .from('experience')
                .select('*')
            if (error) throw error;
            return data; // data 객체 profile 에 반환
        }
    });

    if (isProfileLoading || isExperienceLoading) return <p>로딩 중...</p>;
    if (pError || eError) return <p>에러가 발생했습니다.</p>;


    return (

        <section id="about" className={styles.section}>
            <h1 className={styles.title}>About</h1>

            <div className={styles.content}>
                {/* 프로필 이미지 */}
                <img
                    src={profile?.profile_url}
                    alt={`${profile?.name}`}
                    className={styles.profile_image}
                />

                <div className={styles.profile_info}>
                    <p className={styles.name}>{profile?.name}</p>
                    <p className={styles.devType}>{profile?.dev_type}</p>
                    <p className={styles.commentText}>{profile?.comment}</p>

                    {/* 프로필 소개 아래의 experience 2x2 그리드 */}
                    <div className={styles.experienceGrid}>
                        <div className={styles.experienceItem}>
                            <p className={styles.experienceHeading}>📖 Activities</p>
                            {/* db에서 Activities 카테고리만 추출 */}
                            {experience
                                ?.filter((item) => item.category === 'Activities')
                                .map((item, index) => (
                                    <p key={index} className={styles.experienceText}>{item.content}</p>
                                ))}
                        </div>

                        <div className={styles.experienceItem}>
                            <p className={styles.experienceHeading}>📚 Papers</p>
                            {experience
                                ?.filter((item) => item.category === 'Papers')
                                .map((item, index) => (
                                    <p key={index} className={styles.experienceText}>{item.content}</p>
                                ))}
                        </div>

                        <div className={styles.experienceItem}>
                            <p className={styles.experienceHeading}>🌍 Location</p>
                            <p className={styles.experienceText}>{profile?.location}</p>
                        </div>

                        <div className={styles.experienceItem}>
                            <p className={styles.experienceHeading}>🕧 Birth</p>

                            <p className={styles.experienceText}>{profile?.birth_date}</p>

                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default About;