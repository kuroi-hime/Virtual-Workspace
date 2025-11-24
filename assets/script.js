// Data variables
const staff = JSON.parse(localStorage.getItem('staff'))||[];
const listStaff = document.getElementById('Workers');

// Alert feature variables
let alertBox = document.getElementById('alert');

// Add new worker feature variables
const staffPlus = document.getElementById('addWorker');
let maxId = staff.length;
const fullName = document.getElementById('fullName');
const role = document.getElementById('role');
const otherRole = document.getElementById('otherRole');
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');

// Form feature variables
const title = document.getElementById('formTitle');
const legend = document.getElementById('formLegend');
const formContainer = document.getElementById('formContainer');
const btnClose = document.getElementById('closeForm');
let counterExp;
const addExperience = document.getElementById('addExp');
const experiences = document.getElementById('experiences');
const saveStaff = document.getElementById('save');
// Form photo
const urlPhoto = document.getElementById('photo');
const avatar = document.getElementById('formAvatar');

// logical constraints -> Assign feature variables
const restrictions = {
    Manager: [],
    Receptionist: ['security', 'servers'],
    IT_Technician: ['reception', 'security'],
    Security_guard: ['reception', 'servers'],
    Cleaning: ['archives'],
    other: ['reception', 'security', 'servers']
}
const roomsCapacity = {
    reception: 2,
    security: 3,
    servers: 5,
    archives: 5,
    staff: 6,
    conference: 10,
}
const rooms = document.getElementsByClassName('room');

// Unassign staff feature variables
const deleteButtons = document.getElementsByClassName('.X');

// App Initialisation
function StaffTemplate(s){
    return `
        <div class="worker" id="${s.id}">
            <img class="workerAvatar" src="${s.url}" alt="avatar worker">
            <div class="workerInfos">
                <h3>${s.fullName}</h3>
                <p>${s.role}</p>
            </div>
        </div>
    `;
}

function renderListeStaff(liste){
    if(liste.length != 0){
        listStaff.innerHTML = liste.map(StaffTemplate).join(""); //I should update this after
    }else{
        listStaff.innerHTML = `
        <div id="noStaff">
            <svg fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                    <title>user-group</title> 
                    <path d="M13 16.168c1.918-0.007 3.635-0.864 4.793-2.215l0.007-0.009c0.93 1.101 2.312 1.796 3.856 1.796 2.782 0 5.036-2.255 5.036-5.036s-2.255-5.036-5.036-5.036c-1.171 0-2.248 0.4-3.104 1.070l0.011-0.008c-1.106-1.979-3.187-3.294-5.576-3.294-3.516 0-6.366 2.85-6.366 6.366s2.85 6.366 6.366 6.366c0.005 0 0.009 0 0.014 0h-0.001zM19.152 8.172c0.643-0.643 1.532-1.040 2.513-1.040 1.964 0 3.556 1.592 3.556 3.556s-1.592 3.556-3.556 3.556c-1.244 0-2.339-0.639-2.974-1.606l-0.008-0.013c0.432-0.824 0.689-1.8 0.696-2.835v-0.002c-0.008-0.582-0.094-1.141-0.247-1.671l0.011 0.044zM13 4.909c2.695 0 4.879 2.185 4.879 4.879s-2.185 4.879-4.879 4.879-4.879-2.185-4.879-4.879c0-0 0-0 0-0.001v0c0.003-2.694 2.186-4.876 4.88-4.879h0zM30.732 24.996c-0.938-4.22-4.648-7.328-9.085-7.328-1.725 0-3.34 0.47-4.725 1.289l0.043-0.024c-1.18-0.434-2.543-0.687-3.965-0.689h-0.001c-5.713 0.024-10.488 4.013-11.717 9.356l-0.016 0.081c-0.011 0.048-0.017 0.103-0.017 0.16 0 0.414 0.336 0.75 0.75 0.75 0.357 0 0.656-0.25 0.731-0.585l0.001-0.005c1.071-4.757 5.261-8.258 10.268-8.258s9.196 3.5 10.254 8.188l0.013 0.070c0.076 0.34 0.374 0.59 0.732 0.59 0 0 0.001 0 0.001 0h-0c0.057-0 0.112-0.007 0.165-0.019l-0.005 0.001c0.34-0.076 0.59-0.375 0.59-0.733 0-0.057-0.006-0.112-0.018-0.165l0.001 0.005c-0.79-3.454-2.981-6.285-5.929-7.916l-0.062-0.031c0.863-0.358 1.864-0.566 2.915-0.566 3.72 0 6.83 2.609 7.602 6.097l0.010 0.052c0.076 0.34 0.374 0.59 0.732 0.59 0 0 0.001 0 0.001 0h-0c0.057-0 0.112-0.007 0.165-0.019l-0.005 0.001c0.34-0.076 0.59-0.375 0.59-0.733 0-0.057-0.006-0.112-0.018-0.165l0.001 0.005z"></path>
                </g>
            </svg>
            No workers added yet
        </div>
        `;
    }
}

renderListeStaff(staff.filter(s=>!s.assigned));
naturalBehave(listStaff);

// Add staff feature
staffPlus.addEventListener('click', ()=>{
    counterExp = 0;
    title.innerText = 'Add new worker';
    legend.style.backgroundColor = '#33C100';
    formContainer.style.display = 'flex';
    experiences.innerHTML = '';
});

btnClose.addEventListener('click', ()=>{
    formContainer.style.display = 'none';
});

// Add staff feature -> dynamique experiences form
function deleteExp(id){
    experiences.removeChild(document.getElementById('experience'+id));
}

addExperience.addEventListener('click', (e)=>{
    e.preventDefault();
    let experience = document.createElement('div');
    experience.classList.add("experience");
    experience.id = `experience${counterExp}`;
    experience.innerHTML = `
                        <div>
                            <h4>Experience</h4>
                            <div onclick="deleteExp(${counterExp++})">
                                <svg fill="currentColor" viewBox="0 0 64 64" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <title></title>
                                        <path d="M50.86,13.38H13a1.5,1.5,0,0,1,0-3H50.86a1.5,1.5,0,0,1,0,3Z"></path>
                                        <path d="M42.4,57.93H21.48a5.5,5.5,0,0,1-5.5-5.5V11.87a1.5,1.5,0,0,1,1.5-1.5H46.4a1.5,1.5,0,0,1,1.5,1.5V52.43A5.51,5.51,0,0,1,42.4,57.93ZM19,13.37V52.43a2.5,2.5,0,0,0,2.5,2.5H42.4a2.5,2.5,0,0,0,2.5-2.5V13.37Z"></path>
                                        <path d="M40,13.37H23.9a1.5,1.5,0,0,1-1.5-1.5V6.57a1.5,1.5,0,0,1,1.5-1.5H40a1.5,1.5,0,0,1,1.5,1.5v5.3A1.5,1.5,0,0,1,40,13.37Zm-14.58-3H38.48V8.07H25.4Z"></path>
                                        <path d="M24.94,47.61a1.5,1.5,0,0,1-1.5-1.5V21.46a1.5,1.5,0,0,1,3,0V46.11A1.5,1.5,0,0,1,24.94,47.61Z"></path>
                                        <path d="M38.94,47.61a1.5,1.5,0,0,1-1.5-1.5V21.46a1.5,1.5,0,0,1,3,0V46.11A1.5,1.5,0,0,1,38.94,47.61Z"></path>
                                        <path d="M31.94,40.38a1.5,1.5,0,0,1-1.5-1.5V28.7a1.5,1.5,0,1,1,3,0V38.88A1.5,1.5,0,0,1,31.94,40.38Z"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label for="title">Title</label>
                                <input type="text" name="title" id="title" placeholder="Experience's title">
                            </div>
                            <div>
                                <label for="company">Company</label>
                                <input type="text" name="company" id="company" placeholder="Company name">
                            </div>
                            <div>
                                <label for="start">Start date</label>
                                <input type="text" name="start" id="start" placeholder="mm-yyyy">
                            </div>
                            <div>
                                <label for="end">End date</label>
                                <input type="text" name="end" id="end" placeholder="mm-yyyy">
                            </div>
                        </div>
    `;
    experiences.appendChild(experience);
});

// photo preview feature

function getPhoto(){
    if(urlPhoto.value=='')
        return "images/Generic avatar.png";
    return urlPhoto.value;
}

function setPhoto(url){
    avatar.setAttribute('src', url);
}

urlPhoto.addEventListener('input', ()=>{
    setPhoto(getPhoto());
});

function getFullName(){
    if(fullName.value=='') throw new Error('Empty name field');

    const re = /^[a-z]'?[a-z]+(\s?[a-z]'?[a-z]+)*$/i;
    if(!re.test(fullName.value)) throw new Error('Invalid name')
    
    return fullName.value.toLowerCase();
}

function setFullName(name){
    fullName.value = name;
}

role.addEventListener('change', ()=>{
    otherRole.style.display='none';
    if(role.value=='other'){
        otherRole.style.display='block';
    }
});

function getRole(){
    if(role.value == '') throw new Error('Empty role field');
    if(role.value=='other'){
        if(otherRole.value == '') throw new Error('Empty role field');
        else
            return otherRole.value.replace('_', ' ');
    }

    return role.value.replace('_', ' ');
}

function setRole(val){
    role.value = val.replace('_', ' ');
}

function getEmail(){
    if(email.value=='') throw new Error('Empty email field');

    let re = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/i;
    if(!re.test(email.value)) throw new Error('Invalid email');

    return email.value;
}

function setEmail(val){
    email.value = val;
}

function getMobile(){
    if(mobile.value=='') throw new Error('Empty mobile field');

    let re = /^\+212\d{9}$/;
    if(!re.test(mobile.value)) throw new Error('Invalid mobile number');

    return mobile.value;
}

function setMobile(val){
    mobile.value = val;
}

function stringToDate(s){
    const [m, y] = s.split('-');
    return new Date(Number(y), Number(m)-1);
}

function getExperience(e){
    let re = /^[a-z]+(\s[a-z]+)*$/i;
    const title = e.querySelector('#title').value.toLowerCase();
    if(title == '') throw new Error('Title field is empty');
    if(!re.test(title)) throw new Error('Invalid title');

    const company = e.querySelector('#company').value.toLowerCase();
    if(company == '') throw new Error('Company name field is empty');
    if(!re.test(company)) throw new Error('Invalid company name');

    let reDate = /^(0[1-9]||1[0-2])\-20(0[0-9]||1[0-9]||2[0-5])$/;
    const startDate = e.querySelector('#start').value;
    const endDate = e.querySelector('#end').value;
    if(startDate == '') throw new Error('Start date is required');
    if(!reDate.test(startDate)) throw new Error('Invalid start date');
    if(endDate == '') throw new Error('End date is required');
    if(!reDate.test(endDate)) throw new Error('Invalid end date');
    if(stringToDate(startDate)>stringToDate(endDate)) throw new Error ('End date earlier than start date!');

    return {title: title, company: company, startDate: startDate, endDate: endDate}
}

function getExperiences(){
    const expers = document.querySelectorAll('.experience');
    const exps = [];
    expers.forEach(exp=>{
        exps.push(getExperience(exp));
    });
    return exps;
}

function getForm(){
    return {id:maxId, url:getPhoto(), fullName:getFullName(), role:getRole(), email:getEmail(), mobile:getMobile(), experiences: getExperiences(), assigned:false};
}

saveStaff.addEventListener('click', (e)=>{
    e.preventDefault();
    try{
        staff.push(getForm());
        maxId++;
        alertBox.innerText = `The new worker is added succesfully`;
        alertBox.style.backgroundColor = '#f5fee2ff';
        alertBox.style.border = '1px solid #b9f871ff';
        alertBox.style.color = '#41b91cff';
        alertBox.style.display = 'inline';
        setTimeout(()=>{alertBox.style.display='none';},2000);
        renderListeStaff(staff.filter(s=>!s.assigned));
        naturalBehave(listStaff);
        localStorage.setItem('staff', JSON.stringify(staff));
        formContainer.style.display='none';
        document.forms[0].reset();
        setPhoto(getPhoto());
    }catch(e){
        alertBox.style.backgroundColor = '#fee2e2';
        alertBox.style.border = '1px solid #f87171';
        alertBox.style.color = '#b91c1c';
        alertBox.innerText = e.message;
        alertBox.style.display = 'inline';
        setTimeout(()=>{alertBox.style.display='none';},2000);
    }
});

// Details worker feature
function closeDetails(){
    document.querySelector('#details').remove();
}

function naturalBehave(liste){
    liste.querySelectorAll('.worker').forEach(worker=>worker.addEventListener('click', ()=>{
        const currentWorker = staff.filter(s=>s.id==worker.id)[0];
        
        const infosWorker = document.createElement('div');
        infosWorker.classList.add('overlay');
        infosWorker.id = 'details'
        infosWorker.innerHTML = `
            <div class='details'>
                <svg onclick="closeDetails()" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <defs> 
                            <style>.cls-1{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style> 
                        </defs> 
                        <title></title> 
                        <g id="cross"> 
                            <line class="cls-1" x1="7" x2="25" y1="7" y2="25"></line> 
                            <line class="cls-1" x1="7" x2="25" y1="25" y2="7"></line> 
                        </g> 
                    </g>
                </svg>
                <div class='avatarDetails'>
                    <img class='avatarImg' src='${currentWorker.url}'>
                    <p class='avatarName'>${currentWorker.fullName}</p>
                </div>
                <div class='Infos'>
                    <label class='labels'>Role</label>
                    <p class='values'>${currentWorker.role}</p>
                    <label class='labels'>Email</label>
                    <p class='values'>${currentWorker.email}</p>
                    <label class='labels'>Mobile</label>
                    <p class='values'>${currentWorker.mobile}</p>
                </div>
                <div class='expDetails'>
                </div>
            </div>
        `;
        if(currentWorker.experiences.length){
            infosWorker.querySelector('.expDetails').innerHTML = '<h4 class="expLegend">Professional experiences</h4>';
            const expContainer = document.createElement('div');
            expContainer.classList.add('expContainer');
            currentWorker.experiences.forEach(exp=>{
                const e = document.createElement('div');
                e.classList.add('expDisp');
                e.innerHTML = `
                    <p class='periode'>${exp.startDate} - ${exp.endDate}</p>
                    <p>${exp.title}</p>
                    <p>${exp.company}</p>
                `;
                expContainer.appendChild(e);
            });
            infosWorker.querySelector('.expDetails').appendChild(expContainer);
        }
        
        infosWorker.style.display = 'flex';
        document.getElementsByTagName('main')[0].appendChild(infosWorker);
    }));
}

