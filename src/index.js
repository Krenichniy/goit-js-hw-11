import './sass/main.scss';
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

import Notiflix from 'notiflix';

import renderGallery from './js/render';

import ImagesService from './js/fetchApi';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onFormSubmit);

const imagesService = new ImagesService();

function onFormSubmit(event) {
  event.preventDefault();

  imagesService.query = event.currentTarget.elements.searchQuery.value;
  console.log(imagesService.query);

  imagesService.resetPage();
  clearGalleryContainer();
  fetchImage();

  new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });

  //   loadMoreBtn.show();

  //   clearGalleryContainer();

  //   fetchArticles();

  //   refs.gallery.innerHTML = renderGallery();
}

function fetchImage() {
  imagesService.fetchImageCards().then(({ hits, totalHits }) => {
    console.log(hits);
    if (hits.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    appendArticleMarkup(hits);
  });
}

function appendArticleMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', renderGallery(hits));
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}

// getImagesCollection().then(response => console.log(response.data.hits));

// fetchUsersBtn.addEventListener('click', async () => {
//   try {
//     const users = await fetchUsers();
//     renderUserListItems(users);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// function fetchArticles() {
//   //   loadMoreBtn.disable();
//   imagesService.fetchImageCards().then(articles => {
//     loadMoreBtn.enable();
//     appendArticleMarkup(articles);
//   });
// }

// const fetchUsersBtn = document.querySelector('.btn');
// const userList = document.querySelector('.user-list');

// fetchUsersBtn.addEventListener('click', async () => {
//   try {
//     const users = await fetchUsers();
//     renderUserListItems(users);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// async function fetchUsers() {
//   const baseUrl = 'https://jsonplaceholder.typicode.com';
//   const userIds = [1, 2, 3, 4, 5];

//   const arrayOfPromises = userIds.map(async userId => {
//     const response = await fetch(`${baseUrl}/users/${userId}`);
//     return response.json();
//   });

//   const users = await Promise.all(arrayOfPromises);
//   return users;
// }

// function renderUserListItems(users) {
//   const markup = users
//     .map(
//       user => `<ul class="item">
//         <p><b>Name</b>: ${user.name}</p>
//         <p><b>Email</b>: ${user.email}</p>
//         <p><b>Company</b>: ${user.company.name}</p>
//       </ul>`,
//     )
//     .join('');
//   userList.innerHTML = markup;
// }
