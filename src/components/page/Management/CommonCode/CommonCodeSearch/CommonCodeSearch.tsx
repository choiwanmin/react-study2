import { useContext, useRef, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { CommonCodeSearchStyled } from "./styled";
import { CommonCodeContext } from "../../../../../api/Provider/CommonCodeProvider";
import { modalState } from "../../../../../stores/modalState";
import { useRecoilState } from "recoil";

export const CommonCodeSearch = () => {
    const options = [
        { label: "그룹코드명", value: "groupName" },
        { label: "그룹코드", value: "groupCode" },
    ];

    const [selectValue, setSelectValue] = useState<string>("groupName");
    const inputValue = useRef<HTMLInputElement>();
    // const test = useContext(CommonCodeContext);
    const { setSearchKeyword } = useContext(CommonCodeContext);
    const [modal, setModal] = useRecoilState(modalState);

    // console.log(test);

    const handlerSearch = () => {
        // console.log(selectValue, inputValue.current.value);
        setSearchKeyword({
            selectedValue: selectValue,
            inputValue: inputValue.current.value,
        });
    };

    return (
        <CommonCodeSearchStyled>
            {/* <select>
                    <option value={"groupName"}>그룹코드명</option>
                    <option value={"groupCode"}>그룹코드</option>
                </select> */}
            <StyledSelectBox options={options} value={selectValue} onChange={setSelectValue} />
            <StyledInput ref={inputValue} />
            <StyledButton onClick={handlerSearch}>검색</StyledButton>
            <StyledButton onClick={() => setModal(!modal)}>등록</StyledButton>
        </CommonCodeSearchStyled>
    );
};
