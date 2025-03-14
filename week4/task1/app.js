document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.ins-api-users');

    const STORAGE_KEY = 'users';
    const STORAGE_EXPIRY_KEY = 'users_expiry';
    const EXPIRY_TIME = 24 * 60 * 60 * 1000;

    const saveUsers = (users) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
        localStorage.setItem(STORAGE_EXPIRY_KEY, Date.now().toString());
    };

    const loadUsers = () => {
        const storedData = localStorage.getItem(STORAGE_KEY);
        const expiryTime = localStorage.getItem(STORAGE_EXPIRY_KEY);

        if (storedData && expiryTime && Date.now() - Number(expiryTime) < EXPIRY_TIME) {
            return JSON.parse(storedData);
        }
        return null;
    };

    const fetchUsers = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users', { cache: "no-store" });

                if (!response.ok) {
                    reject(`HTTP Hatası: ${response.status}`);
                }

                const users = await response.json();
                saveUsers(users);
                resolve(users);
            } catch (error) {
                console.error("Veri çekme hatası:", error);
                reject(error);
            }
        });
    };

    const renderUsers = (users) => {
        container.innerHTML = "<h2>Kullanıcı Listesi</h2>";

        const table = document.createElement('table');
        table.classList.add("user-table");

        table.innerHTML = `
            <thead>
                <tr>
                    <th>Ad</th>
                    <th>E-posta</th>
                    <th>Adres</th>
                    <th>İşlem</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;

        const tbody = table.querySelector('tbody');
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</td>
                <td>
                    <button data-id="${user.id}" class="delete-btn">Sil</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        container.appendChild(table);
    };

    const deleteUser = (userId) => {
        let users = loadUsers();
        if (!users) return;

        users = users.filter(user => user.id !== userId);
        saveUsers(users);
        renderUsers(users);
    };

    container.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const userId = Number(event.target.dataset.id);
            deleteUser(userId);
        }
    });

    const init = async () => {
        let users = loadUsers();
        if (!users) {
            users = await fetchUsers();
        }
        renderUsers(users);
    };

    init();
});

const style = document.createElement('style');
style.innerHTML = `
    .user-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .user-table th {
        background-color: #4CAF50;
        color: white;
        padding: 12px;
        text-align: left;
        font-weight: bold;
    }
    .user-table td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: left;
    }
    .user-table tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    .user-table tr:hover {
        background-color: #ddd;
    }
    .delete-btn {
        background-color: red;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 8px 16px;
        cursor: pointer;
        font-size: 14px;
    }
    .delete-btn:hover {
        background-color: rgb(172, 26, 26);
    }
    .delete-btn:focus {
        outline: none;
    }
`;
document.head.appendChild(style);
