import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchData, PER_PAGE } from 'services/pixabayApi';
import { Container } from './AppStyled';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';

export function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [total, setTotal] = useState(0);
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setIsloading(true);
      try {
        const { totalHits, hits } = await fetchData(query, page);
        const totalPages = Math.ceil(totalHits / PER_PAGE);
        if (hits.length === 0) {
          return toast.error('Sorry, no images found. Please, try again!');
        }
        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }
        if (page === totalPages) {
          toast.info("You've reached the end of search results.");
        }
        const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        });
        setImages(images => [...images, ...data]);
        setTotal(totalHits);
      } catch (error) {
        setError(error);
      } finally {
        setIsloading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleSearch = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setError(null);
  };
  //загрузить больше
  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = largeImageURL => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const loadImages = images.length !== 0;
  const isLastPage = images.length === total;
  const loadMoreBtn = loadImages && !isLoading && !isLastPage;

  return (
    <Container>
      <SearchBar onSubmit={handleSearch} />

      {error && toast.error(error.message)}

      {isLoading && <Loader />}

      {loadImages && <ImageGallery images={images} onClick={toggleModal} />}

      {loadMoreBtn && <Button onClick={onLoadMore}>Load more</Button>}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}

      <ToastContainer theme="colored" position="top-right" autoClose={3000} />
    </Container>
  );
}
