# WorkSphere - Virtual Workspace

## 📌 Project Overview
WorkSphere is an interactive web application for managing staff placement on a floor plan in real time.  
It allows adding, moving, and removing employees while enforcing role-based restrictions across different zones.  
The interface is modern and intuitive, built with **HTML5, CSS3, and JavaScript**.

---

## 🚀 Features
- Add, edit, and remove employees with detailed profiles (name, role, photo, contact info, experiences).
- Real-time floor plan visualization with 6 zones:
  - Conference Room
  - Reception
  - Server Room
  - Security Room
  - Staff Room
  - Archives
- Role-based restrictions (e.g., only IT staff in Server Room).
- Animations and intuitive UI with color-coded buttons.
---

## 🖥️ Tech Stack
- **Frontend:** HTML5, CSS3 (Flexbox, Grid, Media Queries), JavaScript (DOM manipulation).
- **Version Control:** Git & GitHub.
- **Deployment:** GitHub Pages / Vercel.
- **Project Management:** Trello / Jira / GitHub Projects.

---

## 🌱 Git Workflow
This project uses a simple branching strategy:

- **`main` branch** → Stable production-ready code.  
- **`develop` branch** → Active development branch.  

### Workflow Steps:
1. Clone the repository:
```bash
git clone https://github.com/kuroi-hime/Virtual-Workspace.git
```
2. Switch to develop branch for development:
```bash
git switch -c develop
```
3. Commit and push changes to develop:
```bash
git add .
git commit -m "Commit message"
git push origin develop
```
4. Once development is complete, merge into main:
```bash
git switch main
git merge develop
git push origin main
```

---

## 🔮 Future Features:
- Drag & Drop staff between zones.
- Search and filter employees.
- Auto-save state in localStorage.
- Auto-reorganization mode.

---

## 🛠️ How to Use

Follow these steps to get started with **WorkSphere – Virtual Workspace**:

1. **Clone the repository**
```bash
git clone https://github.com/kuroi-hime/Virtual-Workspace.git
cd Virtual-Workspace
```
2. **Open the project**
- Launch index.html in your browser, or
- Use a local server (e.g., VS Code Live Server).

3. **Add an employee**
- Click the “Add New Worker” button in the left section.
- Fill in the form (name, role, photo, contact info, experiences).
- Preview the photo before saving.

4. **View employee details**
- Click on an employee card to open their profile.

5.  **Assign worker**
- Click the “+” button in any zone.
- Select one employee from the left unassigned staff list.
It's done. Your employee apears on the selected zone.

6. **Unassign worker**
- Click the “X” button on the desired employee.
It's done. Your employee is removed from that zone and appears again in the unassigned staff.

7. **Automatic empty zone detection**
- For the obligatory zone, each one is colored in red if it's empty otherwise it's colored in white.

or simply visit my website: 
- **Live Demo:** [WorkSphere Virtual Workspace](https://kuroi-hime.github.io/Virtual-Workspace/assets/virtualSpace.html)