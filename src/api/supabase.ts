import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase 환경 변수가 설정되지 않았습니다. .env 파일이 프로젝트 루트(포트폴리오 폴더)에 있고, 변수 이름이 VITE_SUPABASE_URL 및 VITE_SUPABASE_ANON_KEY인지 확인하세요.");
}

// Vite의 import.meta.env 값은 빌드 시 문자열로 치환되므로 여기서는 문자열로 단언합니다.
export const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);
