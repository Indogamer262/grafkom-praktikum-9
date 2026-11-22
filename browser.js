// 2472008 - Christian Anthony Hermawan
// AI GEN - buat task browser sederhana yang tujuannya cuma nge-list directory yang ada secara dinamis dan jika di klik langsung membuka halaman webnya (index.html dalam folder). Styilng light mode, dengan rounded corner tipis, kalo di select highlightnya warna biru, sisanya kotak biasa warna abu gelap outlined, udah gitu aja, hanya perlu edit ./index.html dan ./browser.js aja

const taskFiles = import.meta.glob('./*/index.html');
const container = document.getElementById('task-list');

const entries = Object.keys(taskFiles)
    .map((path) => {
        const match = path.match(/^\.\/([^/]+)\/index\.html$/);
        const dirName = match ? match[1] : path;
        return {
            dirName,
            url: path
        };
    })
    .filter((entry) => entry.dirName !== 'node_modules' && !entry.dirName.startsWith('.'));

entries.sort((a, b) => a.dirName.localeCompare(b.dirName));

if (entries.length === 0) {
    const emptyMsg = document.createElement('div');
    emptyMsg.textContent = 'Tidak ada directory yang ditemukan.';
    emptyMsg.style.color = '#718096';
    container.appendChild(emptyMsg);
} else {
    entries.forEach((entry) => {
        const item = document.createElement('a');
        item.className = 'task-item';
        item.href = entry.url;
        item.textContent = entry.dirName;

        item.addEventListener('click', () => {
            document.querySelectorAll('.task-item').forEach((el) => el.classList.remove('selected'));
            item.classList.add('selected');
        });

        container.appendChild(item);
    });
}