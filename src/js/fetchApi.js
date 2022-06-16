const axios = require('axios');

const BASE_URL = 'https://pixabay.com/api/';
const myKey = '27990741-9fab199c60b940a6a95dff2fa';

// export default async function getImagesCollection() {
//   return await axios.get(`${BASE_URL}`, {
//     params: {
//       key: myKey,
//       q: 'cat',
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       page: 1,
//       per_page: 40,
//     },
//   });
// }

// const API_KEY = '27990741-9fab199c60b940a6a95dff2fa';

export default class ImagesService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImageCards() {
    const params = {
      key: myKey,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    };

    const url = `${BASE_URL}`;

    return await axios.get(url, { params }).then(({ data: hits }) => {
      this.page += 1;
      return hits;
    });
    //   ).then(response => {
    //   this.page += 1;
    //   return response.data.hits;
    // })
  }

  //     async function fetchUsers() {
  //   const baseUrl = 'https://jsonplaceholder.typicode.com';
  //   const userIds = [1, 2, 3, 4, 5];

  //   const arrayOfPromises = userIds.map(async userId => {
  //     const response = await fetch(`${baseUrl}/users/${userId}`);
  //     return response.json();
  //   });

  //   const users = await Promise.all(arrayOfPromises);
  //   return users;
  // }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
