const noticeButton = document.getElementById('notice-button');
const adult = localStorage.getItem('adult');

if (adult == 'false' || adult == null) {
    document.querySelector('.notice-overlay').classList.remove('hidden');
    document.body.classList.add('ohidden');
}

noticeButton.onclick = function () {
    localStorage.setItem('adult', true);
    document.querySelector('.notice-overlay').classList.add('hidden');
    document.body.classList.remove('ohidden');
    form.search.focus();
};