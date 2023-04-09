import React from "react";
import { ImageItem, Image } from "./ImageGalleryItem.styled";
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ smallUrl, query, largeUrl, onOpenModal }) => (
    <ImageItem onClick={onOpenModal}>
        <Image src={smallUrl} alt={query} data-url={largeUrl} />
    </ImageItem>
);

ImageGalleryItem.propTypes = {
    smallUrl: PropTypes.string.isRequired,
    query: PropTypes.string.isRequired,
    largeUrl: PropTypes.string.isRequired,
    onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;