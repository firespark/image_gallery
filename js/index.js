const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
const api_key = '9a7c41059f6921203562a86046ebedf0';
const page = getRandomInt(1, 100);
const per_page = 39;

let search = 'nature';

const imagesContainer = document.querySelector('.images-container');
const form = document.getElementById('search-form');
const closeButton = document.querySelector('.close');

function createImageSrc(imageObj, sizeSuffix) {
    return `https://live.staticflickr.com/${imageObj.server}/${imageObj.id}_${imageObj.secret}_${sizeSuffix}.jpg`;
}

async function getData() {
    const res = await fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${search}&per_page=${per_page}&page=${page}&sort=interestingness-asc&format=json&nojsoncallback=?`
    );
    const data = await res.json();

    console.log(data.photos);
    
    return data.photos.photo;
}
  
async function showImages() {

    imagesContainer.classList.add('dblock');
    
    await createSpinner();

    const images = await getData();

    let a;
    let image;

    imagesContainer.innerHTML = '';
    imagesContainer.classList.remove('dblock');

    images.forEach(element => {
        a = document.createElement('a');
        a.href = createImageSrc(element, 'b');
        a.target = '_blank';
        a.classList.add('image');
        image = document.createElement('img');
        image.src = createImageSrc(element, 'n');
        image.alt = element.title;
        a.appendChild(image)
        imagesContainer.append(a);
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function createSpinner() {
    /* if (!generateInsultButton.classList.contains('hidden')) {
        generateInsultButton.classList.add('hidden');
    } */
    
    imagesContainer.innerHTML = '<img class="spinner-img" src="img/spinner.gif" alt="">';
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (form.search.value) {
        search = form.search.value;
        showImages();
    }
});

closeButton.addEventListener('click', function(e) {
    /* if (form.search.value) {
        search = 'nature';
        form.search.value = '';
        showImages();
    } */
    form.search.value = '';
});

form.search.focus();
showImages();

 





document.getElementById('year').textContent = new Date().getFullYear();
