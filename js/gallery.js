import galleryItems from './data/gallery-items.js';

const refs = {
  galleryContainer: document.querySelector('.js-gallery'),

  lightBoxContainer: document.querySelector('.js-lightbox'),
  lightBoxImg: document.querySelector('.lightbox__image'),
  lightBoxOverlay: document.querySelector('.lightbox__overlay'),
  lightBoxCloseButton: document.querySelector('[data-action="close-lightbox"]'),
};

const galleryItemsHtml = galleryItems.map(makeGalleryItemHtml).join('');

refs.galleryContainer.innerHTML = galleryItemsHtml;

refs.galleryContainer.addEventListener('click', onGalleryItemClick);

function makeGalleryItemHtml({ preview, original, description }) {
  return ` <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
}

function onGalleryItemClick(e) {
  e.preventDefault();

  const eTargetEl = e.target;

  if (!eTargetEl.classList.contains('gallery__image')) return;

  refs.lightBoxContainer.classList.add('is-open');

  setLightBoxImg(eTargetEl);

  refs.lightBoxCloseButton.addEventListener('click', closingLightBox, {
    once: true,
  });
  refs.lightBoxOverlay.addEventListener('click', closingLightBox, {
    once: true,
  });
}

function setLightBoxImg(eTargetEl) {
  refs.lightBoxImg.setAttribute('src', eTargetEl.dataset.source);
  refs.lightBoxImg.setAttribute('alt', eTargetEl.getAttribute('alt'));
}

function closingLightBox(e) {
  refs.lightBoxContainer.classList.remove('is-open');
}
