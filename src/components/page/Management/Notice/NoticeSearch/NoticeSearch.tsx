import { Button } from "react-bootstrap";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { NoticeSearchStyled } from "./styled";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { modalState } from "../../../../../stores/modalState";
import { useRecoilState } from "recoil";

export const NoticeSearch = () => {
    const title = useRef<HTMLInputElement>(); // +>dom, input에 직접 접근 인풋엘리먼트에 대한 타입 자체를 넣어줘야함
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const navigate = useNavigate();
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    useEffect(() => {
        // console.log(window.location.search);
        // console.log(window.location);
        window.location.search && navigate(window.location.pathname, { replace: true });
    }, []);

    const handlerSearch = () => {
        // 검색 데이터를 url에 queryParam으로 옮겨 줄꺼입니다.
        const query: string[] = [];
        !title.current.value || query.push(`searchTitle=${title.current.value}`);
        !startDate || query.push(`searchStDate=${startDate}`);
        !endDate || query.push(`searchEdDate=${endDate}`);

        const queryString = query.length > 0 ? `?${query.join("&")}` : "";
        navigate(`/react/management/notice${queryString}`);

        // console.log(startDate, endDate, title.current.value);
    };

    return (
        <NoticeSearchStyled>
            <StyledInput ref={title}></StyledInput>
            <StyledInput type='date' onChange={(e) => setStartDate(e.target.value)}></StyledInput>
            <StyledInput type='date' onChange={(e) => setEndDate(e.target.value)}></StyledInput>
            <StyledButton variant='secondary' onClick={handlerSearch}>
                검색
            </StyledButton>
            <StyledButton onClick={() => setModal(!modal)}>등록</StyledButton>
        </NoticeSearchStyled>
    );
};
