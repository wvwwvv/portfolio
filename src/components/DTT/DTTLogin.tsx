import {useState} from "react";
import styles from './DTTLogin.module.css'
import {useNavigate} from "react-router-dom";
import {supabase} from "../../api/supabase.ts";

const DTTLogin = () => {

    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // 닉네임, 비밀번호 작성 후 "다음" 버튼 눌렀을 때 실행되는 로직
    const handleNextButton = async () => {
        if (!nickname || !password) {
            alert("닉네임과 비밀번호를 모두 입력해주세요!");
            return;
        }

        try {
            // nickname 으로 조회
            // useQuery 가 아닌 버튼 클릭 시 조회
            const { data: user, error } = await supabase
                .from('visitor')
                .select('*')
                .eq('nickname', nickname)
                .maybeSingle(); // single 로 하면 데이터가 존재하지 않을 때 error 처리함.

            if (error) throw error;


            /* 분기 처리 필요 */
            if (user) {
                // nickname 이미 db에 존재할 때
                if (user.password === password) {
                    // password 일치 : 결과 페이지 이동
                    navigate(`/dtt/result`, {state: {nickname, password}});
                } else {
                    // password 불일치 : 안내 메시지
                    alert("이미 존재하는 닉네임입니다. 비밀번호를 확인해주세요.");
                }
            } else {
                // nickname 존재하지 않을 때 : 처음 방문한 유저이므로 검사페이지로 이동
                // state 로 닉네임, 비번 저장해서 테스트 페이지로 넘겨줌
                navigate('/dtt/test', {state: {nickname, password}});
            }
        } catch (err) {
            alert("데이터 확인 과정에서 에러 발생")
        }


    }


    return (
        <div className={styles.section}>
            <div className={styles.header}>
                <div className={styles.title}>Developer Type Test</div>
                <div className={styles.title_description}>만약 강상민님과 함께 개발하게 된다면?</div>
                <p className={styles.description}>
                    당신은 어떤 동료인가요?<br/>
                    몇 가지 질문을 통해 당신의 개발 스타일과 협업 성향을 분석해 드립니다.<br/>
                    분석된 결과를 바탕으로, 이 포트폴리오의 주인인 홍길동 개발자와의 업무 시너지를 매칭해 드립니다.<br />
                    서로의 강점이 어떻게 보완될지, 함께 일할 때 어떤 폭발적인 결과가 나올지 미리 확인해 보세요.
                </p>
            </div>

            <div className={styles.input_group}>
                <input
                    type="text"
                    placeholder="닉네임"
                    className={styles.input}
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button className={styles.next_button} onClick={handleNextButton}>다음</button>
        </div>
    )
}

export default DTTLogin;