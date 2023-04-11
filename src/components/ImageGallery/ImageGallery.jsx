import { useState, useEffect } from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { GalleryWrapper } from "./ImageGallery.styled";
import LoadMoreButton from "components/Button/Button";
import Spiner from "components/Loader/Loader";
import DeafaultScreen from "components/DeafaultScreen/DeafaultScreen";
import ErrorScreen from "components/ErrorScreen/ErrorScreen";
import { toast } from 'react-toastify';
import Modal from "components/Modal/Modal";
import { fetchImages } from "services/api";
import scrollPageDown from "helpers/Scroll";


const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected'
}

const ImageGallery = ({ query, page, onLoadMore }) => {
    const [gallery, setGallery] = useState([]);
    const [status, setStatus] = useState(Status.IDLE);
    const [showModal, setShowModal] = useState(false);
    const [bigImgUrl, setBidImgUrl] = useState(null);
    const [total, setTotal] = useState(null);


    useEffect(() => {
        document.addEventListener('click', ({ target }) => {
            if (target.nodeName !== 'IMG') {
                setShowModal(false);
                return;
            } else {
                setShowModal(true);
            }
        });
    }, []);

    useEffect(() => {
        setGallery([]);
    }, [query])


    useEffect(() => {
        if (!query) return;

        setStatus(Status.PENDING);

        async function getImages() {
            try {
                const GalleryData = await fetchImages(query, page);
                const newImg = GalleryData.hits;
                const total = GalleryData.totalHits;

                setTotal(total);

                if (!newImg.length) {
                    showErrorMessage(query);
                    setStatus(Status.REJECTED);
                }
                
                setGallery(prevGallery => [...prevGallery, ...newImg]);
                setStatus(Status.RESOLVED);
                
                if (page === 1) {
                    showSuccesMessage(total);
                }

                if (page > 1) {
                    scrollPageDown();
                }

            } catch (error) {
                setStatus(Status.REJECTED)
            }
        }

        getImages();
        
    }, [query, page])

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const openModal = ({ target }) => {
        setBidImgUrl(target.dataset.url)
        setShowModal(true);
    }

    
    const showSuccesMessage = (total) => {
        return toast.success(`Total images in this gallery: ${total}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const showErrorMessage = () => {
        toast.error("Let's try something else", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }     

    if (status === Status.IDLE) {
        return (<DeafaultScreen />);
    }

    if (status === Status.PENDING) {
        return (<Spiner />);
    }

    if (status === Status.REJECTED) {
        return (<ErrorScreen query={query} />);
    }

    if (status === Status.RESOLVED) {
        return (
            <>
                <GalleryWrapper onClick={toggleModal}>
                    {
                        gallery.map(({ id, webformatURL, largeImageURL}) =>
                            <ImageGalleryItem
                                key={id}
                                smallUrl={webformatURL}
                                largeUrl={largeImageURL}
                                onOpenModal={openModal}
                                query={query}
                            />
                        )
                    }
                </GalleryWrapper>

                {
                    showModal && <Modal onClose={toggleModal}  bigImgUrl={bigImgUrl} query={query} />
                }


                {
                    gallery.length > 0 && gallery.length !== total && (
                        <LoadMoreButton onLoadMore={onLoadMore} />
                    )
                }
                
            </>
        )
    }
}

export default ImageGallery;