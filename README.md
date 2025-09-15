This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Todo Application

This project is a **Todo Application** built using **React.js**, allowing users to manage tasks such as adding, editing, completing, and deleting. The app also maintains the task data across page refreshes using **localStorage**.

---

## 🧠 Features

- **Add New Todos**: Users can add a task by specifying a title and description.
- **Edit Todos**: Users can modify the title and description of an existing task.
- **Complete Todos**: Tasks can be marked as completed and will be moved to the "Completed" section.
- **Delete Todos**: Users can delete both active and completed tasks.
- **Data Persistence**: Todos and completed tasks are stored in **localStorage**, ensuring persistence even after refreshing the page.

---


## ⚙️ Memory Map / Storage Structure

The **localStorage** is used to store two arrays:

| Key            | Purpose                   |
|----------------|---------------------------|
| `todolist`     | Stores active (incomplete) tasks. |
| `completedTodos` | Stores completed tasks, along with the timestamp of when they were completed. |

---

## ▶️ How to Run the Application

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/todo-application.git
    cd todo-application
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Open the app in your browser at [http://localhost:3001](http://localhost:3001) to start using the Todo application.

---

## 💻 Technologies Used

- **React.js**
- **CSS**
- **localStorage**

---

## 📝 Screenshots

![Todo Application Screenshot](https://via.placeholder.com/600x400.png)  

---

## 🚀 Future Enhancements

- **User Authentication**: Implement a login system to manage tasks per user.
- **Task Priority**: Add functionality to assign priority (e.g., high, medium, low) to tasks.
- **Due Dates**: Allow users to set due dates for tasks.
- **Theme Toggle**: Provide an option to switch between dark and light themes.

