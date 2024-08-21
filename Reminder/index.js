document.addEventListener('DOMContentLoaded', () => {
    const reminderList = document.getElementById('reminder-list');
    const addReminderButton = document.getElementById('add-reminder');
    const reminderTitle = document.getElementById('reminder-title');
    const reminderTime = document.getElementById('reminder-time');

    let reminders = [];

    addReminderButton.addEventListener('click', addReminder);

    function addReminder() {
        const title = reminderTitle.value;
        const time = new Date(reminderTime.value);
        if (title && time) {
            const reminder = {
                id: Date.now(),
                title,
                time,
                timeoutId: null
            };

            scheduleReminder(reminder);
            reminders.push(reminder);
            renderReminders();
        }
    }

    function scheduleReminder(reminder) {
        const timeDifference = reminder.time - new Date();
        if (timeDifference > 0) {
            reminder.timeoutId = setTimeout(() => {
                alert(`Reminder: ${reminder.title}`);
                deleteReminder(reminder.id);
            }, timeDifference);
        } else {
            alert("Selected time is in the past.");
        }
    }

    function renderReminders() {
        reminderList.innerHTML = '';
        reminders.forEach(reminder => {
            const li = document.createElement('li');
            li.className = 'reminder-item';
            li.innerHTML = `
                ${reminder.title} - ${reminder.time.toLocaleString()}
                <button onclick="editReminder(${reminder.id})">Edit</button>
                <button onclick="deleteReminder(${reminder.id})">Delete</button>
            `;
            reminderList.appendChild(li);
        });
    }

    window.editReminder = function (id) {
        const reminder = reminders.find(r => r.id === id);
        if (reminder) {
            reminderTitle.value = reminder.title;
            reminderTime.value = reminder.time.toISOString().slice(0, 16);
            deleteReminder(id);
        }
    }

    window.deleteReminder = function (id) {
        reminders = reminders.filter(r => r.id !== id);
        clearTimeout(reminder.timeoutId);
        renderReminders();
    }
});
