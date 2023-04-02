import { isEscapeKey } from './utils.js';

const COMMENTS_LIMIT = 5;
const body = document.querySelector('body');
const bigPicture = body.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('img');
const bigPictureCancel = bigPicture.querySelector('#picture-cancel');
const pictureLikesCount = bigPicture.querySelector('.likes-count');
const pictureCommentsCount = bigPicture.querySelector('.comments-count');
const pictureCaption = bigPicture.querySelector('.social__caption');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = bigPicture.querySelector('.social__comment');
const bigPictureCommentsLoader = document.querySelector('.comments-loader');

const createCommentElement = ({id, avatar, name, message}) => {
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.dataset.id = id;
  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    commentsFragment.append(createCommentElement(comment));
  });

  commentsList.append(commentsFragment);
};

const loadComments = (comments) => {
  const splicedComments = comments.splice(0, COMMENTS_LIMIT);

  bigPictureCommentsLoader.classList.remove('hidden');
  renderComments(splicedComments);

  if (comments.length === 0) {
    bigPictureCommentsLoader.classList.add('hidden');
  }
};

const fillBigPicture = ({url, likes, description, comments}) => {
  bigPictureImage.src = url;
  pictureLikesCount.textContent = likes;
  pictureCommentsCount.textContent = comments.length;
  pictureCaption.textContent = description;

  commentsList.innerHTML = ''; // Удаляет дефолтные комментарии из разметки
  loadComments(comments);

  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPictureCommentsCount.classList.add('hidden');

  bigPictureCancel.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });

  const closeBigPicture = document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });
  document.removeEventListener('keydown', closeBigPicture);
  bigPictureCommentsLoader.addEventListener('click', () => loadComments(comments));
};

export { fillBigPicture };