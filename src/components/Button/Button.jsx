import React from "react";
import { FiArrowDownCircle } from "react-icons/fi";
import { LoadMoreBtn } from "./Button.styled";

const LoadMoreButton = ({onLoadMore}) => {
    return (
        <LoadMoreBtn onClick={onLoadMore}>
                <FiArrowDownCircle size={32} />
        </LoadMoreBtn>
    )
};

export default LoadMoreButton;

