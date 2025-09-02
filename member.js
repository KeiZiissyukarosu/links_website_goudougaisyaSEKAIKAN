// ページ階層に応じて JSON パスを自動設定
let jsonPath = 'member.json'; // member.html の場合
if (window.location.pathname.includes('/member/')) {
  jsonPath = '../member.json'; // 個人ページは1階層上
}

// 個人ページ用ID（個人ページのみ設定）
const memberId = window.memberId;

fetch(jsonPath)
  .then(response => response.json())
  .then(members => {

    // ---------- 個人ページ用プロフィール ----------
    const profileContainer = document.getElementById('member-profile');
    if (profileContainer && memberId) {
      const member = members.find(m => m.id === memberId);
      if (member) {
        profileContainer.innerHTML = `
          <img src="${jsonPath.includes('../') ? '../images/' : 'images/'}${member.image}" alt="${member.name}" class="member-photo">
          <h2>${member.name}</h2>
          <p class="member-position">${member.position}</p>
          <p class="member-bio">${member.bio ? member.bio.replace(/\n/g, '<br>') : ''}</p>
        `;
      } else {
        profileContainer.innerHTML = '<p>メンバー情報が見つかりません</p>';
      }
    }

    // ---------- 一覧ページ / フッター直前の全員カード ----------
    const container = document.getElementById('members-container');
    if (container) {
      members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');
        card.innerHTML = `
          <a href="${jsonPath.includes('../') ? member.profilePage : 'member/' + member.profilePage}">
            <img src="${jsonPath.includes('../') ? '../images/' : 'images/'}${member.image}" alt="${member.name}" class="member-photo">
            <div class="member-name">${member.name}</div>
            <div class="member-position">${member.position}</div>
          </a>
        `;
        container.appendChild(card);
      });
    }

  })
  .catch(error => console.error('Error loading member.json:', error));
