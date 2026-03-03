import styles from './Skill.module.css'
import {useQuery} from "@tanstack/react-query";
import {supabase} from "../../api/supabase.ts";
import type {Skills} from "../../types/Skills.ts";


const Skill = () => {

    const {data: skills, isLoading, error} = useQuery<Skills[]>({
        queryKey: ['skills'],
        queryFn: async () => {
            const {data, error} = await supabase
                .from('skill')
                .select('*')
            if (error) throw error;
            return data;
        }
    });

    if (isLoading) return <p>로딩 중...</p>;
    if (error) return <p>에러가 발생했습니다.</p>;

    return (
        <section id="skill" className={styles.section}>
            <h1 className={styles.title}>Skills</h1>

            <div className={styles.all_contents}>
                <div className={styles.all_skills}>
                    {/* skill 한 줄 */}
                    <div className={styles.skills_row}>
                        <p className={styles.skill_category}>Backend</p>
                        <div className={styles.skills_container}>
                            <div className={styles.skills}>
                                {skills
                                    ?.filter((skill) => skill.category === 'Backend')
                                    .map((item) => (
                                        <div className={styles.icon_wrapper}>
                                            <img src={item.icon_url} className={styles.skills_icon}/>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.skills_row}>
                        <p className={styles.skill_category}>Frontend</p>
                        <div className={styles.skills_container}>
                            <div className={styles.skills}>
                                {skills
                                    ?.filter((skill) => skill.category === 'Frontend')
                                    .map((item) => (
                                        <div className={styles.icon_wrapper}>
                                            <img src={item.icon_url} className={styles.skills_icon}/>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.skills_row}>
                        <p className={styles.skill_category}>Mobile</p>
                        <div className={styles.skills_container}>
                            <div className={styles.skills}>
                                {skills
                                    ?.filter((skill) => skill.category === 'Mobile')
                                    .map((item) => (
                                        <div className={styles.icon_wrapper}>
                                            <img src={item.icon_url} className={styles.skills_icon}/>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.skills_row}>
                        <p className={styles.skill_category}>Etc</p>
                        <div className={styles.skills_container}>
                            <div className={styles.skills}>
                                {skills
                                    ?.filter((skill) => skill.category === 'Etc')
                                    .map((item) => (
                                        <div className={styles.icon_wrapper}>
                                            <img src={item.icon_url} className={styles.skills_icon}/>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </section>
    );
};

export default Skill;