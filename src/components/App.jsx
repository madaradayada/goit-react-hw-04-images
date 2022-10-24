import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchData, PER_PAGE } from 'services/pixabayApi';
import { Container } from './AppStyled';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    query: '',
    error: null,
    page: 1,
    showModal: false,
    largeImageURL: null,
  };
  //обновляется компонент
  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const { page } = this.state;

    if (prevQuery !== nextQuery || (prevState.page !== page && page !== 1)) {
      this.fetchImages();
    }
  }
  async fetchImages() {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
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
      this.setState(({ images }) => ({
        images: [...images, ...data],
        total: totalHits,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleSearch = query => {
    if (query === this.state.query) return;
    this.setState({
      images: [],
      query,
      page: 1,
      error: null,
    });
  };
  //загрузить больше
  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      isLoading: true,
    }));
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largeImageURL: largeImageURL });
  };

  render() {
    const { images, error, isLoading, showModal, largeImageURL, tags, total } =
      this.state;
    const loadImages = images.length !== 0;
    const isLastPage = images.length === total;
    const loadMoreBtn = loadImages && !isLoading && !isLastPage;

    return (
      <Container>
        <SearchBar onSubmit={this.handleSearch} />

        {error && toast.error(error.message)}

        {isLoading && <Loader />}

        {loadImages && (
          <ImageGallery images={images} onClick={this.toggleModal} />
        )}

        {loadMoreBtn && <Button onClick={this.onLoadMore}>Load more</Button>}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}

        <ToastContainer theme="colored" position="top-right" autoClose={3000} />
      </Container>
    );
  }
}
