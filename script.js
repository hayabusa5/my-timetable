const days = ['月', '火', '水', '木', '金'];
const hours = ['1', '2', '3', '4', '5', '6'];
const timetable = document.getElementById('timetable');

function createTable() {
  let tableHTML = '<tr><th></th>';
  for (let day of days) {
    tableHTML += `<th>${day}曜日</th>`;
  }
  tableHTML += '</tr>';

  for (let hour of hours) {
    tableHTML += `<tr><th>${hour}時間目</th>`;
    for (let day of days) {
      tableHTML += `<td id="${day}-${hour}" onclick="addVideo('${day}-${hour}')"></td>`;
    }
    tableHTML += '</tr>';
  }

  timetable.innerHTML = tableHTML;
}

async function addVideo(id) {
  const url = prompt('動画のURLを入力してください:');
  if (!url) return;

  const videoId = url.split('v=')[1];
  const apiKey = 'AIzaSyDE9dAaZBC7lSiWzdFC5PdJSVJCmgz0YJE';
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const snippet = data.items[0].snippet;

    const title = snippet.title;
    const thumbnailUrl = snippet.thumbnails.default.url;

    document.getElementById(id).innerHTML = `
      <p>${title}</p>
      <img src="${thumbnailUrl}" alt="${title}">
      <br>
      <a href="${url}" target="_blank">動画を見る</a>
      <br>
      <button onclick="deleteVideo('${id}')">削除</button>
    `;
  } catch (error) {
    alert('動画の取得に失敗しました。');
  }
}

function deleteVideo(id) {
  document.getElementById(id).innerHTML = '';
}

createTable();
