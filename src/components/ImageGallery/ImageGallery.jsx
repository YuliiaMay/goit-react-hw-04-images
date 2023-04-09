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

const ImageGallery = ({ query }) => {
    const [gallery, setGallery] = useState([]);
    const [status, setStatus] = useState(Status.IDLE);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [bigImgUrl, setBidImgUrl] = useState(null);
    const [total, setTotal] = useState(null);
    


    useEffect(() => {
        document.addEventListener('click', ({ target }) => {
            if (target.nodeName !== 'IMG') {
                setShowModal(false);
                return;
            }

            setShowModal(true);
        });
    }, []);


    useEffect(() => {
        reset();
    }, [query])

    useEffect(() => {
        if (!query) return;

        setStatus(Status.PENDING);

        async function getImages() {
            try {
                const GalleryData = await fetchImages(query, page);
                const newImg = GalleryData.data.hits;
                const total = GalleryData.data.totalHits;

                setTotal(total);

                if (newImg.length > 0) {
                    setStatus(Status.RESOLVED);
                    setGallery(prevGallery => [...prevGallery, ...newImg]);
                    

                    if (page === 1 && showModal === false) {
                        showSuccesMessage(total);
                    }

                    if (page > 1) {
                        scrollPageDown();
                    }
                    return;
                }

                showErrorMessage(query);
                setStatus(Status.REJECTED)
            } catch (error) {
                setStatus(Status.REJECTED)
            }
        }

        getImages();
        
    }, [query, page, showModal])
    


    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const openModal = ({ target }) => {
        setBidImgUrl(target.dataset.url)
        setShowModal(true);
    }


    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
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

    const reset = () => {
        setGallery([]);
        setPage(1);
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
                        <LoadMoreButton onLoadMore={handleLoadMore} />
                    )
                }
                
            </>
        )
    }
}

export default ImageGallery;