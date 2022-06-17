import './sass/main.scss';
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

import Notiflix from 'notiflix';

import renderGallery from './js/render';

import ImagesService from './js/fetchApi';

import LoadMoreBtn from './js/components/buttonAddImages';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

// const lightBox =
const imagesService = new ImagesService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
});
const lightBox = new SimpleLightbox('.gallery div a', {
  captionDelay: 250,
  captionsData: 'alt',
});

refs.form.addEventListener('submit', onFormSubmit);
loadMoreBtn.refs.button.addEventListener('click', fetchImage);

loadMoreBtn.hide();

function onFormSubmit(event) {
  event.preventDefault();

  imagesService.query = event.currentTarget.elements.searchQuery.value;

  imagesService.resetPage();
  clearGalleryContainer();
  loadMoreBtn.hide();
  fetchImage();
}

function fetchImage() {
  imagesService
    .fetchImageCards()
    .then(result => {
      const {
        config: {
          params: { page, per_page },
        },
        data: { hits, totalHits },
      } = result;

      appendArticleMarkup(hits);
      loadMoreBtn.show();

      if (totalHits <= page * per_page) {
        loadMoreBtn.hide();
        Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
      }
    })
    .catch(error => error);
}

function appendArticleMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', renderGallery(hits));
  lightBox.refresh();
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}
