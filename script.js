// Services Data
const services = [
  { id:'fire', icon:'🚒', name:'National Emergency Number', eng:'Emergency Number', number:'999', category:'All' },
  { id:'police', icon:'👮', name:'Police Helpline Number', eng:'Police', number:'999', category:'Police' },
  { id:'ambulance', icon:'🚑', name:'Fire Service Number', eng:'Fire Service', number:'999', category:'Fire' },
  { id:'rail', icon:'🚆', name:'Ambulance Service', eng:'Ambulance', number:'1994-999999', category:'Health' },
  { id:'acc', icon:'⚖️', name:'Women & Child Helpline', eng:'Women & Child Helpline', number:'109', category:'Help' },
  { id:'national', icon:'📞', name:'Anti-Corruption Helpline', eng:'Anti-Corruption', number:'106', category:'Govt.' },
  { id:'electricity', icon:'🚆', name:'Electricity Helpline', eng:'Electricity Outage', number:'16216', category:'Electricity' },
  { id:'ngo', icon:'⚖️', name:'Brac Helpline', eng:'Brac', number:'16445', category:'NGO' },
  { id:'travel', icon:'📞', name:'Bangladesh Railway Helpline ', eng:'Bangladesh Railway', number:'163', category:'Travel' }
];

// State
let heartCount = 0;
let coinCount = 100;
let copyCount = 0;

// DOM Elements
const cardGrid = document.getElementById('cardGrid');
const heartEl = document.getElementById('heartCount');
const coinEl = document.getElementById('coinCount');
const copyEl = document.getElementById('copyCount');
const historyList = document.getElementById('historyList');
const clearBtn = document.getElementById('clearHistoryBtn');

// Update Navbar Stats
function updateStats(){
  heartEl.textContent = heartCount;
  coinEl.textContent = coinCount;
  copyEl.textContent = copyCount;
}


function copyToClipboard(text){
  var textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);

  textarea.select();
  textarea.setSelectionRange(0, 99999); 

  let success = document.execCommand("copy");
  document.body.removeChild(textarea);
  return success;
}

// Add to History
function addToHistory(svc){
  const li = document.createElement('li');
  li.className = 'history-item';
  const time = new Date().toLocaleTimeString();
  li.innerHTML = `
    <div>
      <div><b>${svc.name}</b></div>
      <div class="muted">${svc.number}</div>
    </div>
    <div class="muted">${time}</div>
  `;
  historyList.prepend(li);
}

// Render Cards
function renderCards(){
  services.forEach(svc => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <button class="heart">💗</button>
      <div class="card-top">
        <div class="icon">${svc.icon}</div>
        <div>
          <div class="title">${svc.name}</div>
          <div class="subtitle">${svc.eng}</div>
        </div>
      </div>
      <div class="row">
        <div class="number">${svc.number}</div>
        <span class="badge">${svc.category}</span>
      </div>
      <div class="actions">
        <button class="btn btn-copy">📋 Copy</button>
        <button class="btn btn-call">📞 Call</button>
      </div>
    `;

    // Heart Click
    card.querySelector('.heart').addEventListener('click', () => {
      heartCount++;
      updateStats();
    });

    // Copy Click
    card.querySelector('.btn-copy').addEventListener('click', () => {
      if(copyToClipboard(svc.number)){
        copyCount++;
        updateStats();
        alert(`Copied ${svc.number} (${svc.name})`);
      } else {
        alert("Copy failed!");
      }
    });

    // Call Click
    card.querySelector('.btn-call').addEventListener('click', () => {
      if(coinCount < 20){
        alert("Not enough coins! Need at least 20.");
        return;
      }
      coinCount -= 20;
      updateStats();
      alert(`Calling ${svc.name} at ${svc.number}`);
      addToHistory(svc);
    });

    cardGrid.appendChild(card);
  });
}

// Clear History
clearBtn.addEventListener('click', () => {
  historyList.innerHTML = '';
});

// Init
renderCards();
updateStats();
