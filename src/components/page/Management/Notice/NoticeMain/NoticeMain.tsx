import { useLocation } from "react-router-dom";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { NoticeModal } from "../NoticeModal/NoticeModal";
import { Portal } from "../../../../common/potal/Portal";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";

export interface INotice {
    noticeId: number;
    title: string;
    content: string;
    author: string;
    createdDate: string;
}

interface INoticeListBodyResponse {
    noticeList: INotice[];
    noticeCnt: number;
}

export const NoticeMain = () => {
    // +>현재 위치 url에 대한 정보를 가져온다
    // const getParam = useLocation();
    const { search } = useLocation();
    const [noticeList, setNoticeList] = useState<INotice[]>([]);
    const [noticeCount, setNoticeCount] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [noticeId, setNoticeId] = useState<number>(0);

    useEffect(() => {
        searchNoticeList();
    }, [search]); // +>[]안에 값이 변경 될 때마다 작용

    const searchNoticeList = (currentPage?: number) => {
        // +> 서버쪽에서 이미 ?사용가능하게 되어있기에 사용 가능
        currentPage = currentPage || 1;
        const searchParam = new URLSearchParams(search); // +>키와 벨류로 나누어 주는 역할
        searchParam.append("currentPage", currentPage.toString());
        searchParam.append("pageSize", "5");

        // axios.post("/mamagement/noticeList.do", searchParam); // +>서버에 api로 요청 역할
        // axios.post("/management/noticeListBody.do", searchParam) {
        axios.post("/management/noticeListBody.do", searchParam).then((res: AxiosResponse) => {
            console.log(res);
            // +>서버에 api로 요청 역할
            setNoticeList(res.data.noticeList);
            setNoticeCount(res.data.noticeCnt);
            setCPage(currentPage);
        });
    };
    // console.log(getParam);
    // console.log(getParam.search);

    // +>함수를 만들게 되는 이유
    const handlerModal = (id: number) => {
        setModal(!modal);
        setNoticeId(id);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchNoticeList(cPage);
    };

    return (
        <>
            총 갯수 {noticeCount} : 현재 페이지 : {cPage}
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={5}>번호</StyledTh>
                        <StyledTh size={50}>제목</StyledTh>
                        <StyledTh size={10}>작성자</StyledTh>
                        <StyledTh size={20}>등록일</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {noticeList?.length > 0 ? ( // +>?를 쓰는 이유는 undefined에 대한 대처하기 위한, 먼저 물어보기 위해서, 하지만 여기서는 noticeList에 초기값이 존재하기에 ?가 없어도 오류가 발생하지 않음
                        // +>비동기, 순서를 보장하지 않기에 undefined에 대한 오류가 발생
                        noticeList.map((notice) => {
                            return (
                                <tr key={notice.noticeId}>
                                    <StyledTd>{notice.noticeId}</StyledTd>
                                    <StyledTd onClick={() => handlerModal(notice.noticeId)}>{notice.title}</StyledTd>
                                    {/* <StyledTd onClick={handlerModal}>{notice.title}</StyledTd> */}
                                    <StyledTd>{notice.author}</StyledTd>
                                    <StyledTd>{notice.createdDate}</StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={4}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <PageNavigate
                totalItemsCount={noticeCount}
                onChange={searchNoticeList}
                itemsCountPerPage={5}
                activePage={cPage}
            />
            {modal && (
                <Portal>
                    <NoticeModal noticeId={noticeId} setNoticeId={setNoticeId} postSuccess={postSuccess} />
                </Portal>
            )}
        </>
    );
};
