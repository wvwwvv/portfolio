import {supabase} from "../../api/supabase.ts";
import {useQuery} from "@tanstack/react-query";
import type {Profile} from "../../types/Profile.ts";
import styles from './About.module.css'
import type {Experience} from "../../types/Experience.ts";


const About = () => {

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
                <img
                    src={profile?.profile_url} className={styles.profile_image}
                />

                <div className={styles.profile_info}>
                    <p style={{fontSize: 48, marginBottom: 20, fontWeight: 'bold'}}>{profile?.name}</p>
                    <p style={{fontSize: 20, marginBottom: 20, fontWeight: 'bold'}}>{profile?.dev_type}</p>
                    <p style={{fontSize: 16, marginBottom: 70}}>{profile?.comment}</p>

                    {/* 프로필 - 소개 아래의 experience 한 줄 */}
                    <div className={styles.experience}>
                        <div>
                            <p style={{fontWeight: 'bold', fontSize: 24, marginBottom: 20}}>Activities</p>

                            {experience
                                ?.filter((item) => item.category === 'Activities') // 카테고리 Activities 만
                                .map((item) => (
                                    <p style={{fontSize: 16, marginBottom: 10}}>{item.content}</p>
                                ))}
                        </div>
                        <div style={{marginLeft: 132}}>
                            <p style={{fontWeight: 'bold', fontSize: 24, marginBottom: 20}}>Certifications</p>

                            {experience
                                ?.filter((item) => item.category === 'Certifications') // 카테고리 Certifications 만
                                .map((item) => (
                                    <p style={{fontSize: 16, marginBottom: 10}}>{item.content}</p>
                                ))}
                        </div>
                    </div>

                    <div className={styles.experience}>
                        <div>
                            <p style={{fontWeight: 'bold', fontSize: 24, marginBottom: 20}}>Location</p>

                            <p style={{fontSize: 16, marginBottom: 10}}>{profile?.location}</p>

                        </div>
                        <div style={{marginLeft: 248}}>
                            <p style={{fontWeight: 'bold', fontSize: 24, marginBottom: 20}}>Birth</p>

                            <p style={{fontSize: 16, marginBottom: 10}}>{profile?.birth_date}</p>

                        </div>
                    </div>
                </div>


            </div>

        </section>
    );
};

export default About;