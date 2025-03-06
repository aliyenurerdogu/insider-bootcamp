$(document).ready(function () {
    $('.task-form').on('submit', function (event) {
        event.preventDefault();

        let taskText = $('#task-input').val().trim();
        if (taskText !== "") {
            let newTask = `
                <li>
                    <span class="task-text">${taskText}</span>
                    <input type="checkbox" class="complete-btn">Tamamlandı
                    <button class="delete-btn">
                        <img src="assets/images/delete.png" alt="Sil">
                    </button>
                </li>
            `;
            $('#task-list').append(newTask);
            $('#task-input').val('');
        }
    });

    $('#task-list').on('click', '.complete-btn', function () {
        $(this).parent().toggleClass('completed');
    });

    $('#task-list').on('click', '.delete-btn', function () {
        $(this).parent().remove();
    });
});
