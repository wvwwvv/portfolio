import styles from './DTTResult.module.css'

import {useParams} from "react-router-dom";

const DTTResult = () => {

    const {nickname} = useParams<{ nickname: string }>(); // url 에서 slug 추출

    return (
        <div className={styles.section}>
            <div>DTT 결과 페이지</div>
            <div>{nickname}</div>
        </div>
    )
}

export default DTTResult;
