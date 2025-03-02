const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const filterCompletedBtn = document.getElementById("filter-completed");
const showAllBtn = document.getElementById("show-all");
const sortPriorityBtn = document.getElementById("sort-priority");

const toggleButtons = () => {
    [filterCompletedBtn, showAllBtn, sortPriorityBtn].forEach(btn =>
        btn.classList.toggle("hidden", taskList.children.length === 0)
    );
};

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    try {
        const title = document.getElementById("task-title").value.trim();
        const desc = document.getElementById("task-desc").value.trim();
        const priority = document.querySelector("input[name='priority']:checked");

        if (!title) return alert("Görev başlığı zorunludur!");
        if (!priority) return alert("Görevin önceliği zorunludur!");

        const taskItem = document.createElement("li");
        taskItem.classList.add("task");
        taskItem.setAttribute("data-priority", priority.value);
        taskItem.innerHTML = `
            <div class="task-group">
                <strong>${title}</strong>  ${desc} (${priority.value})
                <input type="checkbox" class="task-status">Tamamlandı
                <button class="delete-btn">Sil</button>
            </div>
        `;

        taskList.appendChild(taskItem);
        taskForm.reset();
        toggleButtons();
    } catch (error) {
        console.error("Beklenmedik bir hata oluştu:", error);
        alert("Bir hata oluştu, lütfen tekrar deneyin!");
    }
});

taskList.addEventListener("click", ({ target }) => {
    try {
        if (target.classList.contains("task-status")) {
            target.closest("li").classList.toggle("completed");
        } else if (target.classList.contains("delete-btn")) {
            target.closest("li").remove();
            toggleButtons();
        }
    } catch (error) {
        console.error("Beklenmedik bir hata oluştu:", error);
        alert("Bir hata oluştu, lütfen tekrar deneyin!");
    }
});

const filterTasks = (showCompleted) => {
    document.querySelectorAll(".task").forEach(task => {
        task.classList.toggle("hidden", showCompleted && !task.classList.contains("completed"));
    });
};

filterCompletedBtn.addEventListener("click", () => filterTasks(true));
showAllBtn.addEventListener("click", () => filterTasks(false));

sortPriorityBtn.addEventListener("click", () => {
    const priorityOrder = { "Düşük": 1, "Orta": 2, "Yüksek": 3 };
    const sortedTasks = [...taskList.children].sort(
        (a, b) => priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority]
    );

    taskList.replaceChildren(...sortedTasks);
});
