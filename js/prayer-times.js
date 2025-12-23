// Prayer Times Display JavaScript
// Loads prayer times from CSV and displays them based on current date

// Parse CSV data
function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',');
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const entry = {};
    headers.forEach((header, index) => {
      entry[header] = values[index];
    });
    data.push(entry);
  }
  
  return data;
}

// Get current date info
function getCurrentDateInfo() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1; // JavaScript months are 0-indexed
  const year = now.getFullYear();
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayName = days[now.getDay()];
  const monthName = months[now.getMonth()];
  
  return { day, month, year, dayName, monthName };
}

// Update current time display
function updateCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const timeElement = document.getElementById('currentTime');
  if (timeElement) {
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  }
}

// Update current date display
function updateCurrentDate() {
  const { day, month, year, dayName, monthName } = getCurrentDateInfo();
  const dateElement = document.getElementById('currentDate');
  
  if (dateElement) {
    dateElement.textContent = `${dayName}, ${monthName} ${day}, ${year}`;
  }
}

// Find prayer times for today
function findTodaysPrayerTimes(prayerData) {
  const { day, month } = getCurrentDateInfo();
  
  const todayData = prayerData.find(entry => 
    parseInt(entry.Day) === day && parseInt(entry.Month) === month
  );
  
  return todayData;
}

// Update prayer times on the page
function updatePrayerTimes(prayerData) {
  const today = findTodaysPrayerTimes(prayerData);
  
  if (!today) {
    console.error('Could not find prayer times for today');
    return;
  }
  
  // Update each prayer time
  const updates = {
    'fajrAdhan': today['Fajr Adhan'],
    'fajrIqamah': today['Fajr Iqamah'],
    'shuruqTime': today['Shouruq'],
    'dhuhrAdhan': today['Dhuhr Adhan'],
    'dhuhrIqamah': today['Dhuhr Iqamah'],
    'asrAdhan': today['Asr Adhan'],
    'asrIqamah': today['Asr Iqamah'],
    'maghribAdhan': today['Maghrib Adhan'],
    'maghribIqamah': today['Maghrib Iqamah'],
    'ishaAdhan': today['Isha Adhan'],
    'ishaIqamah': today['Isha Iqamah']
  };
  
  // Update all elements
  Object.keys(updates).forEach(elementId => {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = updates[elementId];
    }
  });
  
  // Highlight current prayer
  highlightCurrentPrayer(today);
}

// Determine and highlight the current prayer
function highlightCurrentPrayer(todayTimes) {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  // Convert prayer times to minutes
  const prayers = [
    { name: 'fajr', time: timeToMinutes(todayTimes['Fajr Adhan']) },
    { name: 'dhuhr', time: timeToMinutes(todayTimes['Dhuhr Adhan']) },
    { name: 'asr', time: timeToMinutes(todayTimes['Asr Adhan']) },
    { name: 'maghrib', time: timeToMinutes(todayTimes['Maghrib Adhan']) },
    { name: 'isha', time: timeToMinutes(todayTimes['Isha Adhan']) }
  ];
  
  // Find current prayer (the one that has passed most recently)
  let currentPrayer = null;
  for (let i = prayers.length - 1; i >= 0; i--) {
    if (currentTime >= prayers[i].time) {
      currentPrayer = prayers[i].name;
      break;
    }
  }
  
  // If before Fajr, highlight Isha (last prayer of previous day)
  if (!currentPrayer) {
    currentPrayer = 'isha';
  }
  
  // Remove all highlights
  document.querySelectorAll('.prayer-time-card').forEach(card => {
    card.classList.remove('highlighted');
  });
  
  // Add highlight to current prayer - find by checking if adhan ID contains prayer name
  document.querySelectorAll('.prayer-time-card').forEach(card => {
    const adhanElement = card.querySelector('.adhan-time');
    if (adhanElement && adhanElement.id.toLowerCase().includes(currentPrayer)) {
      card.classList.add('highlighted');
    }
  });
}

// Convert time string to minutes since midnight
function timeToMinutes(timeStr) {
  if (!timeStr || timeStr === '--:--') return 0;
  const parts = timeStr.split(':');
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

// Load CSV and initialize
async function loadPrayerTimes() {
  try {
    const response = await fetch('assets/data/Islamisk Center Vest - Masjid Salah-Timings.csv');
    const csvText = await response.text();
    const prayerData = parseCSV(csvText);
    
    // Update prayer times
    updatePrayerTimes(prayerData);
    updateCurrentDate();
    
    // Update current time every second
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // Update highlighted prayer every minute
    setInterval(() => {
      const today = findTodaysPrayerTimes(prayerData);
      if (today) highlightCurrentPrayer(today);
    }, 60000);
    
  } catch (error) {
    console.error('Error loading prayer times:', error);
  }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadPrayerTimes);
} else {
  loadPrayerTimes();
}

