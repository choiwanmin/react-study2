import { useContext, useEffect, useState } from "react";
import { CommonCodeMainStyled } from "./styled";
import { CommonCodeContext } from "../../../../../api/Provider/CommonCodeProvider";
import axios, { AxiosResponse } from "axios";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { CommonCodeModal } from "../CommonCodeModal/CommonCodeModal";
import { Portal } from "../../../../common/potal/Portal";
import { useNavigate } from "react-router-dom";
import { searchApi } from "../../../../../api/CommonCodeApi/searchApi";
import { CommonCode } from "../../../../../api/api";

import { ICommonCode, ICommonCodeResponse } from "../../../../../models/interface/ICommonCode";

export const CommonCodeMain = () => {
    const { searchKeyword } = useContext(CommonCodeContext);
    const [commonCodeList, setCommonCodeList] = useState<ICommonCode[]>();
    const [modal, setModal] = useRecoilState(modalState);
    const [groupId, setGroupId] = useState<number>(0);
    const navigate = useNavigate(); //url 직접 접근 가능하도록

    useEffect(() => {
        console.log(searchKeyword);
        serachCommonCode();
    }, [searchKeyword]);

    // const serachCommonCode = (currentPage?: number) => {
    const serachCommonCode = async (currentPage?: number) => {
        currentPage = currentPage || 1;
        //비동기 함수
        const result = await searchApi<ICommonCodeResponse>(CommonCode.searchList, {
            ...searchKeyword,
            currentPage,
            pageSize: 5,
        });

        if (result) {
            setCommonCodeList(result.commonCode);
        }

        searchApi;
        // axios
        //     .post("/management/commonCodeListBody.do", {
        //         ...searchKeyword,
        //         currentPage,
        //         pageSize: 5,
        //     })
        //     .then((res: AxiosResponse<ICommonCodeResponse>) => {
        //         setCommonCodeList(res.data.commonCode);
        //     });
    };

    const handlerModal = (id: number) => {
        setModal(!modal);
        setGroupId(id);
    };

    const postSuccess = () => {
        setModal(!modal);
        serachCommonCode();
    };
    // <StyledTable></StyledTable>
    // const columns = [
    //     { key: "groupIdx", title: "번호" },
    //     { key: "groupCode", title: "그룹코드", clickable: true },
    //     { key: "groupName", title: "그룹코드명" },
    //     { key: "note", title: "그룹코드설명" },
    //     { key: "createdDate", title: "등록일" },
    //     { key: "useYn", title: "사용여부" },
    //     { key: "actions", title: "비고" },
    // ] as Column<ICommonCode>[];

    return (
        <CommonCodeMainStyled>
            {/* <StyledTable data={commonCodeList} columns={colums} renderAction={(row) => <StyledButton size='small' onClick={() => handlerModal(row.groupIdx)}>수정</StyledButton>} onCellClick={(row, coulnm) => {if(column === "groupCode"){navigate(`${row.groupIdx}`, {state: {groupCode: row.groupCode}})}}}/>  */}

            <table>
                <colgroup>
                    <col style={{ width: "5%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "8%" }} />
                    <col style={{ width: "5%" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>그룹코드</th>
                        <th>그룹코드명</th>
                        <th>그룹코드설명</th>
                        <th>등록일</th>
                        <th>사용여부</th>
                        <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                    {commonCodeList?.length > 0 ? (
                        commonCodeList.map((commonCode) => {
                            return (
                                <tr key={commonCode.groupIdx}>
                                    <td>{commonCode.groupIdx}</td>
                                    <td
                                        className='td-pointer'
                                        onClick={() => {
                                            // navigate("" + commonCode.groupIdx); //url 추가 타입은 string만 됨
                                            navigate(`${commonCode.groupIdx}`, {
                                                state: {
                                                    groupCode: commonCode.groupCode,
                                                },
                                            }); //url 추가 타입은 string만 됨
                                        }}
                                    >
                                        {commonCode.groupCode}
                                    </td>
                                    <td>{commonCode.groupName}</td>
                                    <td>{commonCode.note}</td>
                                    <td>{commonCode.createdDate}</td>
                                    <td>{commonCode.useYn}</td>
                                    <td>
                                        <StyledButton
                                            onClick={() => {
                                                handlerModal(commonCode.groupIdx);
                                            }}
                                        >
                                            수정
                                        </StyledButton>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={7}>조회 내역이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {modal && ( //모달이 참일때
                <Portal>
                    <CommonCodeModal groupId={groupId} postSuccess={postSuccess} setGroupId={setGroupId} />
                </Portal>
            )}
        </CommonCodeMainStyled>
    );
};
