let zoneCount = 0;

function addZone() {
    // 动态创建一个新的Zone矩形
    const zoneList = document.getElementById('zone-list');
    zoneCount++;

    const newZone = document.createElement('div');
    newZone.classList.add('zone-box');

    newZone.innerHTML = `
        <p>Zone ${zoneCount}</p>
        <p>Address: not define</p>
        <p>Last notification: N/A <button class="see-more" onclick="toggleDropdown(this)">See more</button></p>
        <p>Notification: null</p>
        <div class="dropdown-content">
            <h4>Title: This is the title</h4>
            <p>Content: This is the detailed notification information.</p>
        </div>
    `;

    zoneList.appendChild(newZone);
}

function toggleDropdown(button) {
    const zoneBox = button.closest('.zone-box');

    // 切换展开状态
    zoneBox.classList.toggle('expanded');
}

function pushNotification() {
    alert("Send notification: Function not implemented");
}
