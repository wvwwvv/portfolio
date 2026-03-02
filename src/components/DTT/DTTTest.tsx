import styles from './DTTTest.module.css'
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {questions} from "../DTTData/question";
import type { Question } from "../../types/Question";
import {supabase} from "../../api/supabase.ts";

const DTTTest = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const {nickname, password} = location.state || {}
    const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Record<number, number>>({}); // 각 점수

    // 마운트 되면 문제 섞기
    useEffect(() => {
        if (!nickname) {
            alert("잘못된 접근입니다. 닉네임이 유효하지 않습니다.");
            navigate("/dtt");
            return;
        }
        const shuffled = [...questions].sort(() => Math.random() - 0.5);
        setShuffledQuestions(shuffled);
    }, [nickname, navigate])

    const scoreWeights = [-5.1, -3.1, -1.1, 1.1, 3.1, 5.1];

    const handleSelectQuestion = (id: number, index: number) => {
        setAnswers({...answers, [id]: scoreWeights[index]});
    };

    const handleSubmit = async () => {
        if (Object.keys(answers).length < shuffledQuestions.length) {
            alert("모든 문항에 답변해주세요");
            return;
        }

        // MBTI 계산 로직

        const scores = { EI:0, NS:0, FT:0, PJ:0}; // EI 값이 + 면 E

        shuffledQuestions.forEach((q) => {
            const score = answers[q.id]; // 화면에 보여지는 문제 순으로, id 가지고 접근, score 추출
            // Question 의 type 따라 점수 더하기
            if (q.type === 'EI' || q.type === 'NS' || q.type === 'FT' || q.type === 'PJ') {
                scores[q.type] += score; // type 4가지에 대해서만 scores 갱신 되도록
            }
        });

        // 절대 EI 값이 0이 되지 않는다
        const mbti_type =
            (scores.EI > 0 ? "E" : "I") +
            (scores.NS > 0 ? "N" : "S") +
            (scores.FT > 0 ? "F" : "T") +
            (scores.PJ > 0 ? "P" : "J");

        try {
            // 최종 DB 중복 체크 - 문제 푸는 사이에 해당 닉으로 다른 사람이 db에 저장한 경우 에러 방지
            const { data: user } = await supabase
                .from('visitor')
                .select('nickname')
                .eq('nickname', nickname)
                .maybeSingle(); // 객체 없을 수 있으므로

            if (user) {
                alert("이미 검사를 마친 닉네임입니다. 결과 페이지로 이동합니다.");
                navigate(`/dtt/result/${nickname}`);
                return;
            }

            // DB 저장
            const { error } = await supabase
                .from('visitor')
                .insert([{ nickname, password, mbti_type}]); // table 의 필드명과 맞춰줌

            if (error) throw error;

            // 결과 페이지로 이동
            navigate(`/dtt/result/${nickname}`);
        } catch (err) {
            console.error(err);
            alert("데이터 저장 중 오류가 발생했습니다.");
        }
    }

    return (
        <div className={styles.section}>
            <div className={styles.header}>
                <p className={styles.subtitle1}>Developer Type Test</p>
                <p className={styles.subtitle2}>만약 강상민님과 함께 개발하게 된다면?</p>
            </div>

            <div className={styles.questionList}>
                {/* 렌더링 되면 먼저 문제를 섞고 map 으로 하나 하나 보여줌 */}
                {shuffledQuestions.map((q) => (
                    <div key={q.id} className={styles.questionItem}>
                        <p className={styles.questionText}>{q.text}</p>
                        {/* 각 질문 선택 영역 */}
                        <div className={styles.options}>
                            <span className={styles.label}>그렇지 않다</span>
                            {/* score, index 의 map 인데, score 명시하면 never used 뜸 */}
                            {scoreWeights.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`${styles.circle} ${styles[`size${idx}`]} ${ /* idx : 0 ~ 5 , size5 따위의 className 적용 */
                                        answers[q.id] === scoreWeights[idx] ? styles.active : "" /* 선택한 idx 의 동그라미만 active 속성 부여 */
                                    }`}
                                    onClick={() => handleSelectQuestion(q.id, idx)}
                                />
                            ))}
                            <span className={styles.label}>그렇다</span>
                        </div>
                    </div>
                ))}
            </div>

            <button className={styles.submitButton} onClick={handleSubmit}>
                결과 확인하기
            </button>
        </div>
    )
}

export default DTTTest;