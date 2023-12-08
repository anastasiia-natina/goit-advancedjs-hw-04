import { fetchPictures, createMarkup } from './fetch-images';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.btn-load-more');
let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;

searchForm.addEventListener('submit', onSearchForm);
loadMoreButton.addEventListener('click', onLoadMoreButton);



async function onSearchForm(event) {
  event.preventDefault();
  window.scrollTo({ top: 0 });
  page = 1;
  query = event.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  loadMoreButton.classList.add('is-hidden');

  if (query === '') {
    alertNoEmptySearch();
    return;
  }

  try {
    const data = await fetchPictures(query, page, perPage);

    if (data.totalHits === 0) {
      alertNoImagesFound();
    } else {
      renderQuery(data.hits);

      simpleLightBox = new SimpleLightbox('.gallery a').refresh();

      alertImagesFound(data);

      if (data.totalHits > perPage) {
        loadMoreButton.classList.remove('is-hidden');
      }
    }
  } catch (error) {
   // console.log(error);
  } finally {
    () => {
      searchForm.reset();
    };
  }
}

async function onLoadMoreButton() {
  page += 1;
  simpleLightBox.destroy();

  try {
    const data = await fetchPictures(query, page, perPage); 

    createMarkup(data.hits);
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();

    const totalPages = Math.ceil(data.totalHits / perPage);

    if (page > totalPages) {
      loadMoreButton.classList.add('is-hidden');
      alertEndOfSearch();
    }
  } catch (error) {
    console.log(error);
  }
}


function alertImagesFound(data) {
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function alertNoEmptySearch() {
  Notiflix.Notify.failure(
    'The search string cannot be empty. Please specify your search query.'
  );
}