import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";


export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const handelSubmit = (query) => {
    setQuery(query);
    setPage(1);
  }

  return (
    <div
      style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
      }}
    >
      
      <Searchbar onSubmit={handelSubmit} />
      <ImageGallery query={query} page={page} />
      
      <ToastContainer />
    </div>
  );
};
