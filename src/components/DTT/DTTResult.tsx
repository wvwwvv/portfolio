import styles from './DTTResult.module.css'

import {useLocation, useNavigate} from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {supabase} from "../../api/supabase.ts";
import type {LoginUser} from "../../types/LoginUser.tsx";
import type {UserDescription} from "../../types/userDescription.ts";
import {useState, useEffect} from "react";

const DTTResult = () => {

    const location = useLocation();
    const {nickname} = location.state || {} // 현재 방문자의 nickname
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // 모달 관련 상태 변수들
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<LoginUser | null>(null);
    const [password, setPassword] = useState('');

    // 컴포넌트 렌더링 시 스크롤을 맨 위로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    /* 검사한 유저 정보 가져오기 */
    const {data: user, isLoading: userIsLoading, error : userError} = useQuery<LoginUser>({
        queryKey: ['visitor'],
        queryFn: async () => {
            const {data, error} = await supabase
                .from('visitor')
                .select('*')
                .eq('nickname', nickname)
                .single()
            if (error) throw error;
            return data;
        }
    });

    /* 검사한 유저의 mbti 로 설명 정보 가져오기 */
    const {data: userDescription} = useQuery<UserDescription>({
        queryKey: ['mbti'],
        queryFn: async () => {
            const {data, error} = await supabase
                .from('mbti')
                .select('*')
                .eq('type_en', user?.mbti_type)
                .single()
            if (error) throw error;
            return data;
        }
    });

    /* 방문자 db 정보 가져오기 */
    const {data: visitors, isLoading: visitorsIsLoading, error: visitorsError} = useQuery<LoginUser[]>({
        queryKey: ['visitors'],
        queryFn: async () => {
            const {data, error} = await supabase
                .from('visitor')
                .select('*')
            if (error) throw error;
            return data;
        }
    });


    if (userIsLoading || visitorsIsLoading) return <p>로딩 중...</p>;
    if (userError || visitorsError) return <p>에러가 발생했습니다.</p>;

    /* 홈으로 이동 후 contact 으로 이동 */
    const handleDevButton = (to: String) => {
        navigate('/', {state: {scrollTo: to}});
    };

    /* visitors 방명록에서 삭제하기 위한 모달 열기 */
    const handleDeleteUserInfo = (user: LoginUser) => {
        setIsModalOpen(true);
        setSelectedUser(user);
        setPassword('');
    };

    /* 모달 닫기 - 상태 변수 초기화 */
    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
        setPassword('');
    };


    /* 삭제 눌렀을 때 호출 */
    const handleConfirmDelete = async () => {
        if (!selectedUser || !password) {
            alert("비밀번호를 입력해주세요.")
            return;
        }

        try {
            /* 입력 비번과 해당 사람의 비번 같아야 삭제 */
            if (selectedUser.password !== password) {
                alert("비밀번호가 틀렸습니다.");
                handleModalClose();
                return;
            }

            /* 방명록에서 휴지통 누른 위치의 유저를 상태변수에 넣고, 해당 닉네임으로 db에서 삭제 */
            const {error} = await supabase
                .from('visitor')
                .delete()
                .eq('nickname', selectedUser.nickname);

            if (error) throw error;

            alert("삭제가 완료되었습니다.");

            // 방문자 테이블 새로고침
            queryClient.invalidateQueries({ queryKey: ['visitors'] });
            handleModalClose();
        }catch (err) {
            alert("삭제중 오류가 발생했습니다.");
        }
    }



    return (
        <div className={styles.section}>
            <div className={styles.header}>
                <div className={styles.subtitle1}>Result</div>
                <div className={styles.subtitle2}>강상민님과의 궁합 결과</div>
            </div>

            {/* glow 효과 배경 범위 */}
            <div className={styles.explain}>
                {/* 배경 안 전체 내용 */}
                <div className={styles.explain_container}>

                    <div className={styles.explain_header}>
                        <div>당신은 {user?.mbti_type}</div>
                        <span style={{color: '#FFCF0F'}}>{userDescription?.type_kr}형 개발자</span>
                        <span>입니다!</span>
                    </div>

                    {/* 설명 text */}
                    <div className={styles.explain_text}>
                        <div>{userDescription?.description}</div>
                    </div>
                </div>
            </div>

            {/* 누르면 contact 페이지로 이동 */}
            <button className={styles.dev_button} onClick={() => handleDevButton('contact')}>강상민과 개발하러 가기</button>

            <div className={styles.visitors_table}>
                {/* visitors 테이블 헤더 */}
                <div className={styles.visitors_table_header}>
                    <div className={styles.visitors_table_number_header}>번호</div>
                    <div className={styles.visitors_table_nickname_header}>닉네임</div>
                    <div className={styles.visitors_table_date_header}>날짜</div>
                </div>

                {/* visitors 테이블 내용 */}
                <div className={styles.visitors_info_container}>
                    {visitors
                        ?.map((item, idx) => (
                            <div key={idx} className={styles.visitor_info}>
                                <div className={styles.visitors_table_number}>{idx+1}</div>
                                <div className={styles.visitors_table_nickname}>{item.nickname}</div>
                                <div className={styles.visitors_table_date}>
                                    {/* YYYY-MM-DD 형식으로 변환 */}
                                    {new Date(item.created_at).toISOString().split('T')[0]}
                                </div>

                                {/* 삭제 버튼 */}
                                <div
                                    className={styles.visitors_table_delete_button}
                                    onClick={() => handleDeleteUserInfo(item)}
                                ></div>
                            </div>

                        ))}

                </div>
            </div>


            {/* 모달 */}
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_container}>
                        <div className={styles.modal_header}>
                            <p>비밀번호를 입력하세요</p>
                        </div>

                        <div className={styles.modal_content}>
                            <input
                                type="password"
                                value={password} /* 상태로 관리하는 변수 */
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.modal_input}
                            />
                        </div>


                        <div className={styles.modal_buttons}>
                            {/* 비밀번호 입력 모달 취소(닫기) 버튼 */}
                            <button
                                className={styles.modal_cancel_button}
                                onClick={handleModalClose}
                            >
                                취소
                            </button>
                            {/* 비밀번호 입력하고 삭제 버튼 */}
                            <button
                                className={styles.modal_delete_button}
                                onClick={handleConfirmDelete}
                                /* 비밀번호 입력 안하면 비활성화 */
                                disabled={!password}
                            >
                                삭제
                            </button>

                        </div>
                    </div>
                </div>
            )

            }

        </div>
    )
}

export default DTTResult;
