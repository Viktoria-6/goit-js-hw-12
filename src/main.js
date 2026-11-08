import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const PER_PAGE = 15;
let query = '';
let page = 1;

function showError(message) {
  iziToast.error({ title: 'Error', message, position: 'topRight' });
}

function updateLoadMore(totalHits) {
  if (page * PER_PAGE >= totalHits) {
    hideLoadMoreButton();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    showLoadMoreButton();
  }
}

function scrollGallery() {
  const card = gallery?.firstElementChild;
  if (!card) return;

  const cardHeight = card.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.target.elements['search-text'].value.trim();

  if (!query) {
    showError('Please enter a search query');
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, PER_PAGE);

    if (!data.hits || data.hits.length === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      hideLoadMoreButton();
      return;
    }

    createGallery(data.hits);
    updateLoadMore(data.totalHits);
  } catch (error) {
    showError(
      'An error occurred while fetching images. Please try again later.'
    );
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, PER_PAGE);

    if (!data.hits || data.hits.length === 0) {
      page -= 1;
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    scrollGallery();
    updateLoadMore(data.totalHits);
  } catch (error) {
    page -= 1;
    showLoadMoreButton();
    showError(
      'An error occurred while fetching images. Please try again later.'
    );
  } finally {
    hideLoader();
  }
});

console.log('Шаблон готовий. Можна писати код 🚀');
