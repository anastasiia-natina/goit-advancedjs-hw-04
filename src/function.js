import { fetchPictures, createMarkup } from './fetch-images';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.btn-load-more');
let query = '';
let page = 1;
let simpleLightBox = new SimpleLightbox('.gallery a');
const perPage = 40;

searchForm.addEventListener('submit', onSearchForm);
loadMoreButton.addEventListener('click', onLoadMoreButton);
loadMoreButton.style.visibility = 'hidden';


async function onSearchForm(event) {
  event.preventDefault();
  page = 1;
  query = event.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  searchForm.reset();
  loadMoreButton.style.visibility = 'hidden';

  if (query === '') {
    alertNoEmptySearch();
    return;
  }

  try {
    const data = await fetchPictures(query, page, perPage);

    if (data.totalHits === 0) {
     alertNoImagesFound();
    } {
      createMarkup(data.hits);

      simpleLightBox.refresh();

      alertImagesFound(data);

      if (data.totalHits > perPage) {
        loadMoreButton.style.visibility = 'visible';
      }
    }
  } catch (error) {
   console.log(error);
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
      loadMoreButton.style.visibility = 'hidden';
      alertEndOfSearch();
    }
  } catch (error) {
    console.log(error);
  }
}


function alertImagesFound(data) {
  iziToast.success({
                title: 'Wow!',
                message: `Hooray! We found ${data.totalHits} images.`,
                position: 'topRight',
              });
}

function alertNoEmptySearch() {
  iziToast.error({
                  title: 'Error!',
                  message: 'The search string cannot be empty. Please specify your search query.',
                  position: 'topRight',
                });
}