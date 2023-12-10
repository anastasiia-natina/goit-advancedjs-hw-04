import axios from 'axios';


    
const API_KEY =
  '34554984-68074c5646cb7a45ce2c04cbc';

const PIXABAY_URL_IMAGES = 'https://pixabay.com/api/';



export async function fetchPictures(query, page) {
  const { data } = await axios
    (`https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}`)

  return data

     
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



