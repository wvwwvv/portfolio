import {supabase} from "../../api/supabase.ts";
import {useQuery} from "@tanstack/react-query";
import type {Profile} from "../../types/Profile.ts";
import styles from './About.module.css'


const About = () => {

    const {data: profile, isLoading, error} = useQuery<Profile>({
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

    if (isLoading) return <p>로딩 중...</p>;
    if (error) return <p>에러가 발생했습니다.</p>;


    return (

        <section id="about" className={styles.section}>
            <h1>안녕하세요</h1>

            <img
                src={profile?.profile_url}
                style={{ width: '200px', borderRadius: '50%' }}
            />

            <p>{profile?.name}</p>
            <p>{profile?.dev_type}</p>
            <p>{profile?.comment}</p>
        </section>
    );
};

export default About;