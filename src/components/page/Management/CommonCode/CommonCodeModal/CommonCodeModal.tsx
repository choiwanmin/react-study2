import React, { FC, useEffect, useState } from "react";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { CommonCodeModalStyle } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import axios, { AxiosResponse } from "axios";
import { searchApi } from "../../../../../api/CommonCodeApi/searchApi";
import { CommonCode } from "../../../../../api/api";
import { postApi } from "../../../../../api/CommonCodeApi/postApi";
import { ICommonCode } from "../../../../../models/interface/ICommonCode";

//프롭타입 지정
interface ICommonCodeModalProps {
    groupId: number;
    postSuccess: () => void;
    setGroupId: React.Dispatch<React.SetStateAction<number>>;
}

// ctrl + d 단축키 같은 이름 선택
const initCommonCode = {
    groupIdx: 0,
    groupCode: "",
    groupName: "",
    useYn: "N",
    createdDate: "",
    author: "",
    note: "",
};

export const CommonCodeModal: FC<ICommonCodeModalProps> = ({ groupId, postSuccess, setGroupId }) => {
    const [modal, setModal] = useRecoilState(modalState);
    const [commonCode, setCommonCode] = useState<ICommonCode>(initCommonCode);

    useEffect(() => {
        // console.log(groupId);
        groupId && commonCodeDetail();

        return () => {
            setGroupId(0);
        };
    }, []);

    const commonCodeDetail = async () => {
        // axios
        //     .post("/management/commonCodeDetailJson.do", { groupIdx: groupId })
        //     .then((res: AxiosResponse<{ detailValue: ICommonCode }>) => {
        //         setCommonCode(res.data.detailValue);
        //     });
        const result = await searchApi<{ detailValue: ICommonCode }>(CommonCode.searchDetail, { groupIdx: groupId });
        if (result) {
            setCommonCode(result.detailValue);
        }
    };

    const updateCommonCode = async () => {
        // axios.post("/management/commonCodeUpdateBody.do", commonCode).then((res: AxiosResponse<{ result: string }>) => {
        //     if (res.data.result === "success") {
        //         alert("수정되었습니다");
        //         postSuccess();
        //     } else if (res.data.result.startsWith("Duplicate")) {
        //         alert(`입력하신 그룹코드(${commonCode.groupCode})는 중복입니다.`);
        //         return false; //여기서 끝내시오
        //     }
        // });

        const result = await postApi(CommonCode.update, commonCode);

        if (result.result === "success") {
            alert("수정되었습니다");
            postSuccess();
        } else if (result.result.startsWith("Duplicate")) {
            alert(`입력하신 그룹코드(${commonCode.groupCode})는 중복입니다.`);
            return false;
        }
    };

    const insertCommonCode = async () => {
        // axios.post("/management/commonCodeSaveBody.do", commonCode).then((res: AxiosResponse<{ result: string }>) => {
        //     if (res.data.result === "success") {
        //         alert("저장되었습니다");
        //         postSuccess();
        //     } else if (res.data.result.startsWith("Duplicate")) {
        //         alert(`입력하신 그룹코드(${commonCode.groupCode})는 중복입니다.`);
        //         return false;
        //     }
        // });

        const result = await postApi(CommonCode.save, commonCode);

        if (result.result === "success") {
            alert("저장되었습니다");
            postSuccess();
        } else if (result.result.startsWith("Duplicate")) {
            alert(`입력하신 그룹코드(${commonCode.groupCode})는 중복입니다.`);
            return false;
        }
    };

    const deleteCommonCode = async () => {
        // axios
        //     .post("/management/commonCodeDeleteBody.do", { groupIdx: groupId })
        //     .then((res: AxiosResponse<{ result: string }>) => {
        //         if (res.data.result === "success") {
        //             alert("삭제되었습니다");
        //             postSuccess();
        //         }
        //     });
        const result = await postApi(CommonCode.delete, { groupIdx: groupId });

        if (result.result === "success") {
            alert("삭제되었습니다");
            postSuccess();
        }
    };

    //{ groupId }리액트 문법이 아님
    // export const CommonCodeModal: FC<ICommonCodeModalProps> = (내맘대로 작성 가능) => {
    // export const CommonCodeModal: FC<ICommonCodeModalProps> = (props) => {
    return (
        <CommonCodeModalStyle>
            <div className='container'>
                <label>
                    그룹코드*
                    <StyledInput
                        type='text'
                        defaultValue={commonCode.groupCode}
                        // onChange={(e) => setCommonCode((prev) => ({ ...prev, groupCode: e.target.value }))}
                        onChange={(e) =>
                            setCommonCode((prev) => ({
                                ...prev,
                                groupCode: e.target.value === e.target.value && e.target.value,
                            }))
                        }
                    ></StyledInput>
                </label>
                <label>
                    그룹코드명*
                    <StyledInput
                        type='text'
                        defaultValue={commonCode.groupName}
                        onChange={(e) => setCommonCode((prev) => ({ ...prev, groupName: e.target.value }))}
                    ></StyledInput>
                </label>
                <label>
                    그룹코드설명*
                    <StyledInput
                        type='text'
                        defaultValue={commonCode.note}
                        onChange={(e) => setCommonCode((prev) => ({ ...prev, note: e.target.value }))}
                    ></StyledInput>
                </label>
                <label>
                    사용여부*
                    <div className='radio-group'>
                        <label>Yes</label>
                        <StyledInput
                            type='radio'
                            name='useYn'
                            value={"Y"}
                            checked={commonCode.useYn === "Y"}
                            onChange={(e) => setCommonCode((prev) => ({ ...prev, useYn: e.target.value }))}
                        />

                        <label>No</label>
                        <StyledInput
                            type='radio'
                            name='useYn'
                            value={"N"}
                            checked={commonCode.useYn === "N"}
                            onChange={(e) => setCommonCode((prev) => ({ ...prev, useYn: e.target.value }))}
                        />
                    </div>
                </label>
                <div className={"button-container"}>
                    <button type='button' onClick={groupId ? updateCommonCode : insertCommonCode}>
                        {groupId ? "수정" : "저장"}
                    </button>
                    {!!groupId && (
                        <button type='button' onClick={deleteCommonCode}>
                            삭제
                        </button>
                    )}
                    <button type='button' onClick={() => setModal(!modal)}>
                        나가기
                    </button>
                </div>
            </div>
        </CommonCodeModalStyle>
    );
};
