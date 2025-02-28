import React, { createContext, FC, useState } from "react";

// 초기값의 타입.
interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

// 다른 컴포넌트에서 사용이 가능한 값을을 만든다.
export const CommonCodeContext = createContext<ISearchKeyword>({});

// 만들어진 값(CommonCodeContext)에 searchKeyword, setSearchKeyword을 넣어서 자식 노드에서
// 자유롭게 searchKeyword과 setSearchKeyword를 호출한다.
export const CommonCodeProvider: FC<{
    children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState<object>({}); // +>{}->오브젝트
    return (
        <CommonCodeContext.Provider value={{ searchKeyword, setSearchKeyword }}>{children}</CommonCodeContext.Provider> // +>하나의 컴포넌트
    );
};

// interface ISearchKeyword {
//     searchKeyword: object;
//     setSearchKeyword: (keyWord: object) => void;
// }

// const defaultValue: ISearchKeyword = {
//     searchKeyword: {},
//     setSearchKeyword: () => {},
// };

// // 다른 컴포넌트에서 사용이 가능한 context를 만든다.
// export const CommonCodeContext = createContext(defaultValue); // +>데이터를 만듬

// // 만들어진 context를 컴포넌트에 전달할 provider를 만든다.
// export const CommonCodeProvider: FC<{
//     children: React.ReactNode | React.ReactNode[];
// }> = ({ children }) => {
//     const [searchKeyword, setSearchKeyword] = useState({}); // +>{}->오브젝트
//     return (
//         <CommonCodeContext.Provider value={{ searchKeyword, setSearchKeyword }}>{children}</CommonCodeContext.Provider> // +>하나의 컴포넌트
//     );
// };
