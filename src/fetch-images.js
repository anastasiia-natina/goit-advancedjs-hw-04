import axios from 'axios';
//import { searchImages } from '';

    
const API_KEY =
  '34554984-68074c5646cb7a45ce2c04cbc';

const PIXABAY_URL_IMAGES = 'https://pixabay.com/api/?';

const axiosInstance = axios.create({
  baseURL: PIXABAY_URL_IMAGES,
   params: {
    key: API_KEY,
    image_type: 'photo', 
    orientation: 'horizontal',
    safesearch: true,
  },
});

export function fetchPictures() {
  return axiosInstance.get('', {
    params: {
      q: query, 
      page: page, 
      per_page: perPage,
    }
  })

    .then(response => response.data)
    .catch(error => {
      console.error(`Error fetching pictures: ${error}`);
      return Promise.resolve([]);
    });
  
}

 
const gallery = document.querySelector('.gallery');

export function createMarkup(images) {
  console.log(images);
  const markup = images
    .map(image => {
      const {
        id,
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `
        <a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>
      `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}



