export default function renderGallery(images) {
  const markup = images
    .map(
      image => `  <div class="photo-card">
      <a class='photo-container' href='${image.largeImageURL}'>
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="api-image"/>
  </a>
  <div class="info">
    <p class="info-item">
        <b>Likes</b>
        <b>${image.likes}</b>
    </p>
    <p class="info-item">
      <b>Views</b>
      <b>${image.views}</b>
    </p>
    <p class="info-item">
        <b>Comments</b>
        <b>${image.comments}</b>
    </p>
    <p class="info-item">
        <b >Downloads</b>
        <b>${image.downloads}</b>
    </p>
  </div>
</div> `,
    )
    .join('');

  return markup;
}
// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок
