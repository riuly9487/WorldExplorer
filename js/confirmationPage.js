const quitBtn = document.querySelector('.btn-quit');
const quitModal = document.getElementById('quit-modal');
const confirmBtn = document.getElementById('confirm-quit');
const cancelBtn = document.getElementById('cancel-quit');

quitBtn.addEventListener('click', () => {
    quitModal.style.display = 'flex';
});

cancelBtn.addEventListener('click', () => {
    quitModal.style.display = 'none';
});

confirmBtn.addEventListener('click', () => {
    window.location.href = 'quiznow.html'; 
});

document.querySelectorAll('.btn-exit')
    .forEach((button) => {
        button.addEventListener('click', () => {
        window.location.href = 'index.html'
    })
})
