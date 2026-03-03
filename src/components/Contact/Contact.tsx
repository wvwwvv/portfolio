import styles from "./Contact.module.css";
import {useQuery} from "@tanstack/react-query";
import {supabase} from "../../api/supabase.ts";
import type {ContactInfo} from "../../types/ContactInfo.ts";

const Contact = () => {

    /* 포트폴리오 관리자 contact 정보 가져오기 */
    const {data: contact, isLoading, error} = useQuery<ContactInfo>({
        queryKey: ['contact'],
        queryFn: async () => {
            const {data, error} = await supabase
                .from('contact')
                .select('*')
                .single()
            if (error) throw error;
            return data;
        }
    });

    if (isLoading) return <p>로딩 중...</p>;
    if (error) return <p>에러가 발생했습니다.</p>;

    return (

        <section id="contact" className={styles.section}>
            <h1 className={styles.title}>Contact</h1>

            <div className={styles.comment}>
                <p>함께 더 큰 가치를 만들어갈 파트너를 구합니다.</p>
                <p>협업 및 문의는 언제든지 편하게 연락 주시기 바랍니다.</p>
            </div>

            <div className={styles.contact_footer}>
                <div className={styles.icons}>
                    <a
                        className={styles.phone_icon}
                        href={`tel:${contact?.phone}`}
                        title="To Instagram"
                    ></a>
                    <a
                        className={styles.instagram_icon}
                        href={contact?.instagram_url}
                        target="_blank"
                        title="To Instagram"
                    ></a>
                    <a
                        className={styles.github_icon}
                        href={contact?.github_url}
                        target="_blank"
                        title="To Github"
                    ></a>
                    <a
                        className={styles.email_icon}
                        href={`mailto:${contact?.email}`}
                        title="send email"
                    ></a>
                </div>
                <div
                    className={styles.copyrights}
                >
                    Copyright @ 강상민 All Rights Reserved.
                </div>
            </div>
        </section>
    );
};

export default Contact;


// contact 페이지 맨 밑에 footer 까지