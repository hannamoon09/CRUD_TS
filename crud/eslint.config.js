import js from '@eslint/js'                               // ESLint 기본 JS 추천 설정 로딩
import globals from 'globals'                             // 브라우저 전역 객체들 설정(window, document 등)
import reactHooks from 'eslint-plugin-react-hooks'        // React의 useEffect, useState 등 Hook 관련 규칙을 위한 플러그인
import reactRefresh from 'eslint-plugin-react-refresh'    // React Fast Refresh 관련 린트 (Vite 개발환경에서 중요)
import tsParser from '@typescript-eslint/parser';         // TypeScript 코드를 ESLint가 이해할 수 있도록 도와주는 파서
import tseslint from '@typescript-eslint/eslint-plugin';  // TypeScript 전용 ESLint 플러그인 (타입 관련 룰 제공)
import prettier from 'eslint-plugin-prettier';            // 코드 포맷을 위한 Prettier 플러그인

import tseslint from 'typescript-eslint'                  

export default tseslint.config(
  {
    // ESLint 검사에서 제외할 디렉토리 (보통 빌드 결과물)
    ignores: ['dist'],    
  },
  {
    // TypeScript 구문을 올바르게 파싱하기 위한 파서 지정
    parser: tsParser,    

    // 추천되는 ESLint 설정들을 확장
    extends: [           
      js.configs.recommended,           // JS 기본 룰
      ...tseslint.configs.recommended,  // TypeScript 추천 룰
      'plugin:prettier/recommended',    // Prettier 관련 설정 자동 적용 
    ],

    files: ['**/*.{js,jsx,ts,tsx}'],  // ESLint가 검사할 파일 확장자 지정

    // 코드의 언어 환경 설정
    languageOptions: {
      ecmaVersion: 2020,        // 최신 JS 문법 지원
      sourceType: 'module',     // ES 모듈 사용
      globals: globals.browser, // 브라우저 환경 전역 변수 설정 (예: window, document)
    },

    // 사용할 ESLint 플러그인들
    plugins: [
      '@typescript-eslint',   // TS 관련 룰
      'react-hooks',          // React Hook 관련 룰
      'react-refresh',        // Vite + React 핫 리로딩 관련 룰
      'prettier',             // Prettier 포맷 검사
    ],

    // 직접 지정하는 룰
    rules: {
      ...reactHooks.configs.recommended.rules,    // React Hook 규칙 추가 (권장 설정)
      'react-refresh/only-export-components': [   // export default만 허용하지 말고 const export도 허용
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error',   // Prettier가 포맷을 틀렸을 경우 ESLint 오류로 표시
    },

  }
)