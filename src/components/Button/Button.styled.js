import styled from "styled-components";


export const LoadMoreBtn = styled.button`
    padding: 8px 16px;
    border-radius: 2px;
    background-color: #FAEA73;
    border: 1px solid #0070A0;
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
    text-align: center;
    display: inline-block;
    align-items: center;
    margin-left: auto; 
    margin-right: auto; 
    justify-content: center;
    color: #0070A0;
    border: 0;
    text-decoration: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 18px;
    line-height: 24px;
    font-style: normal;
    font-weight: 500;
    width: 180px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

    &:hover,
    &:focus {
        background-color: #0070A0;
        color: #fff
    }
`