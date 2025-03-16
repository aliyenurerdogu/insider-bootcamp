let appendLocation = '';

const cssContent = `
    #user-container {
        max-width: 400px;
        margin: 20px auto;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
    }

    .user {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        margin: 5px 0;
        background-color: white;
        border-radius: 5px;
    }

    .delete-user {
        background-color: red;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    #refresh-users {
        display: block;
        margin: 10px auto;
        padding: 8px 12px;
        background-color: blue;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.2s;
    }
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = cssContent;
document.head.appendChild(styleElement);


const EXPIRE_TIME = 3600000; // 1 saat (milisaniye cinsinden)

const fetchUsers = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        const userData = {
            users,
            timestamp: Date.now()
        };

        localStorage.setItem('users', JSON.stringify(userData));
        renderUsers(users);
    } catch (error) {
        console.error("Kullanıcıları alırken hata oluştu:", error);
    }
};

const getUsersFromStorage = () => {
    const data = localStorage.getItem('users');
    if (!data) return null;

    const { users, timestamp } = JSON.parse(data);
    if (Date.now() - timestamp > EXPIRE_TIME) {
        localStorage.removeItem('users');
        return null;
    }

    return users;
};

const renderUsers = (users) => {
    const userContainer = document.getElementById('user-container');
    if (!userContainer) return;

    userContainer.innerHTML = "";
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.dataset.id = user.id;
        userDiv.innerHTML = `
            <p>${user.name} (${user.email})</p>
            <button class="delete-user">Sil</button>
        `;
        userContainer.appendChild(userDiv);
    });

    checkAndShowRefreshButton();
};

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-user')) {
        const userDiv = event.target.closest('.user');
        if (!userDiv) return;

        const userId = parseInt(userDiv.dataset.id);
        let users = getUsersFromStorage() || [];
        users = users.filter(user => user.id !== userId);

        if (users.length <= 0 && sessionStorage.getItem('buttonUsed')) {
            const userContainer = document.getElementById('user-container');
            userContainer.remove();
        }

        const userData = {
            users,
            timestamp: Date.now()
        };

        localStorage.setItem('users', JSON.stringify(userData));
        renderUsers(users);
    }
});

document.addEventListener('click', (event) => {
    if (event.target.id === 'refresh-users') {
        fetchUsers();
        sessionStorage.setItem('buttonUsed', 'true');
        event.target.remove();
        checkAndShowRefreshButton();
    }
});

const checkAndShowRefreshButton = () => {
    const userContainer = document.getElementById('user-container');
    if (!userContainer) return;

    const usersExist = document.querySelectorAll('.user').length > 0;
    if (!usersExist && !sessionStorage.getItem('buttonUsed')) {
        if (!document.getElementById('refresh-users')) {
            const refreshButton = document.createElement('button');
            refreshButton.id = 'refresh-users';
            refreshButton.textContent = 'Kullanıcıları Tekrar Çek';
            userContainer.appendChild(refreshButton);
        }
    }
};

const main = () => {
    if (!document.querySelector(appendLocation)) {
        console.error('Belirtilen selector bulunamadı:', appendLocation);
        return;
    }

    const userContainer = document.createElement('div');
    userContainer.id = 'user-container';
    document.querySelector(appendLocation).appendChild(userContainer);

    // MutationObserver 
    const observer = new MutationObserver(checkAndShowRefreshButton);
    observer.observe(userContainer, { childList: true });

    const users = getUsersFromStorage();
    if (users) {
        renderUsers(users);
    } else {
        fetchUsers();
    }
    observer.disconnect();
};

main();

