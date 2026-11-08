import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  if (!gallery) return;

  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
          </a>
          <div class="info">
            <p class="info-item"><span>Likes:</span> ${likes}</p>
            <p class="info-item"><span>Views:</span> ${views}</p>
            <p class="info-item"><span>Comments:</span> ${comments}</p>
            <p class="info-item"><span>Downloads:</span> ${downloads}</p>
          </div>
        </li>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  if (gallery) {
    gallery.innerHTML = '';
  }
}

export function showLoader() {
  if (loader) loader.classList.remove('hidden');
}

export function hideLoader() {
  if (loader) loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  if (loadMoreBtn) loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
}
