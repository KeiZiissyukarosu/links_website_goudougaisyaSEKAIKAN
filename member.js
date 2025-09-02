// ページで個人ページIDを設定する場合（例: <script>const memberId = 'OtiHyogo';</script>）
const memberId = window.memberId;

fetch('members.json')
  .then(response => response.json())
  .then(members => {

    // ---------- 個人ページ用 ----------
    const profileContainer = document.getElementById('member-profile');
    if (profileContainer && memberId) {
      const member = members.find(m => m.id === memberId);
      if (member) {
        profileContainer.innerHTML = `
          <img src="images/${member.image}" alt="${member.name}" class="member-photo">
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
          <a href="member/${member.profilePage}">
            <img src="images/${member.image}" alt="${member.name}" class="member-photo">
            <div class="member-name">${member.name}</div>
            <div class="member-position">${member.position}</div>
          </a>
        `;
        container.appendChild(card);
      });
    }

  })
  .catch(error => console.error('Error loading members.json:', error));
