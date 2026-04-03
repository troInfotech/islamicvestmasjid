// Prayer Times Display JavaScript
// Loads prayer times from CSV and displays them based on current date

// Parse CSV data (supports both comma and semicolon delimiters)
function parseCSV(csv, delimiter = ',') {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(delimiter).map(h => h.trim());
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(delimiter).map(v => v.trim());
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
  
  // Get current language
  const currentLang = localStorage.getItem('language') || 'en';
  
  // Day and month keys for translation lookup
  const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const monthKeys = ['january', 'february', 'march', 'april', 'may', 'june', 
                     'july', 'august', 'september', 'october', 'november', 'december'];
  
  // Get translated day and month names
  let dayName, monthName;
  if (typeof translations !== 'undefined' && translations[currentLang]) {
    dayName = translations[currentLang][dayKeys[now.getDay()]] || dayKeys[now.getDay()];
    monthName = translations[currentLang][monthKeys[now.getMonth()]] || monthKeys[now.getMonth()];
  } else {
    // Fallback to English
    const defaultDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const defaultMonths = ['January', 'February', 'March', 'April', 'May', 'June', 
                           'July', 'August', 'September', 'October', 'November', 'December'];
    dayName = defaultDays[now.getDay()];
    monthName = defaultMonths[now.getMonth()];
  }
  
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
      const timeValue = updates[elementId];
      
      let cleanValue;
      if (timeValue && timeValue !== '' && timeValue !== undefined && timeValue !== null) {
        cleanValue = timeValue.trim();
        if (!/^\d{1,2}:\d{2}$/.test(cleanValue)) {
          cleanValue = cleanValue.replace(/[^\d:]/g, '');
        }
        cleanValue = applyDST(cleanValue);
      } else {
        cleanValue = '--:--';
      }
      
      element.textContent = cleanValue;
    }
  });
  
  // Highlight current prayer
  highlightCurrentPrayer(today);
}

// Determine and highlight the current prayer
function highlightCurrentPrayer(todayTimes) {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  // Convert prayer times to minutes (apply DST offset so highlight matches displayed times)
  const prayers = [
    { name: 'fajr', time: timeToMinutes(applyDST(todayTimes['Fajr Adhan'])) },
    { name: 'dhuhr', time: timeToMinutes(applyDST(todayTimes['Dhuhr Adhan'])) },
    { name: 'asr', time: timeToMinutes(applyDST(todayTimes['Asr Adhan'])) },
    { name: 'maghrib', time: timeToMinutes(applyDST(todayTimes['Maghrib Adhan'])) },
    { name: 'isha', time: timeToMinutes(applyDST(todayTimes['Isha Adhan'])) }
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
  
  // Remove all highlights from table rows
  document.querySelectorAll('.prayer-times-table tbody tr').forEach(row => {
    row.classList.remove('highlighted');
  });
  
  // Add highlight to current prayer row
  const currentRow = document.getElementById(currentPrayer + 'Row');
  if (currentRow) {
    currentRow.classList.add('highlighted');
  }
  
  // Legacy support: Remove all highlights from cards (if they exist)
  document.querySelectorAll('.prayer-time-card').forEach(card => {
    card.classList.remove('highlighted');
  });
  
  // Legacy support: Add highlight to current prayer card
  document.querySelectorAll('.prayer-time-card').forEach(card => {
    const adhanElement = card.querySelector('.adhan-time');
    if (adhanElement && adhanElement.id.toLowerCase().includes(currentPrayer)) {
      card.classList.add('highlighted');
    }
  });
}

// Find tomorrow's prayer times
function findTomorrowsPrayerTimes(prayerData) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const day = tomorrow.getDate();
  const month = tomorrow.getMonth() + 1;
  
  const tomorrowData = prayerData.find(entry => 
    parseInt(entry.Day) === day && parseInt(entry.Month) === month
  );
  
  return tomorrowData;
}

// Update tomorrow's times
function updateTomorrowTimes(prayerData) {
  const tomorrow = findTomorrowsPrayerTimes(prayerData);
  
  if (!tomorrow) {
    return;
  }
  
  const tomorrowUpdates = {
    'fajrTomorrow': tomorrow['Fajr Iqamah'],
    'dhuhrTomorrow': tomorrow['Dhuhr Iqamah'],
    'asrTomorrow': tomorrow['Asr Iqamah'],
    'maghribTomorrow': tomorrow['Maghrib Iqamah'],
    'ishaTomorrow': tomorrow['Isha Iqamah']
  };
  
  Object.keys(tomorrowUpdates).forEach(elementId => {
    const element = document.getElementById(elementId);
    if (element) {
      const timeValue = tomorrowUpdates[elementId];
      let cleanValue;
      if (timeValue && timeValue !== '' && timeValue !== undefined && timeValue !== null) {
        cleanValue = timeValue.trim();
        if (!/^\d{1,2}:\d{2}$/.test(cleanValue)) {
          cleanValue = cleanValue.replace(/[^\d:]/g, '');
        }
        cleanValue = applyDST(cleanValue);
      } else {
        cleanValue = '--:--';
      }
      element.textContent = cleanValue;
    }
  });
}

// Detect if current date falls within Daylight Saving Time
// Denmark observes DST: last Sunday of March (02:00) → last Sunday of October (03:00)
function isDST() {
  const now = new Date();
  const jan = new Date(now.getFullYear(), 0, 1);
  const jul = new Date(now.getFullYear(), 6, 1);
  // Standard offset is the larger (less negative) of the two
  const stdOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  return now.getTimezoneOffset() < stdOffset;
}

// Add one hour to a time string (HH:MM), handles midnight wrap-around
function addOneHour(timeStr) {
  if (!timeStr || timeStr === '--:--' || !/^\d{1,2}:\d{2}$/.test(timeStr.trim())) {
    return timeStr;
  }
  const parts = timeStr.trim().split(':');
  let hours = parseInt(parts[0]) + 1;
  const minutes = parts[1];
  if (hours >= 24) hours -= 24;
  return String(hours).padStart(2, '0') + ':' + minutes;
}

// Apply DST offset to a time value if needed
function applyDST(timeStr) {
  if (isDST()) return addOneHour(timeStr);
  return timeStr;
}

// Convert time string to minutes since midnight
function timeToMinutes(timeStr) {
  if (!timeStr || timeStr === '--:--') return 0;
  const parts = timeStr.split(':');
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

// Load and update Friday (Jumu'ah) prayer times
async function loadFridayPrayerTimes() {
  try {
    const response = await fetch('assets/data/Islamisk Center Vest - Masjid Salah-Timings - friday Prayer.csv');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    // This CSV uses semicolon as delimiter
    const fridayData = parseCSV(csvText, ';');
    
    // Find today's Friday prayer times
    const { day, month } = getCurrentDateInfo();
    const todayFriday = fridayData.find(entry => 
      parseInt(entry.Day) === day && parseInt(entry.Month) === month
    );
    
    if (todayFriday) {
      // Update Jumu'ah times display
      const urduEl = document.getElementById('urduSpeechTime');
      const danishEl = document.getElementById('danishSpeechTime');
      const jamaatEl = document.getElementById('jamaatTime');
      
      if (urduEl) urduEl.textContent = todayFriday['Urdu Speech'] || '--:--';
      if (danishEl) danishEl.textContent = todayFriday['Danish Speech'] || '--:--';
      if (jamaatEl) jamaatEl.textContent = todayFriday['Jamaat'] || '--:--';
    }
    
  } catch (error) {
    console.error('Error loading Friday prayer times:', error);
  }
}

// Load CSV and initialize
async function loadPrayerTimes() {
  try {
    const response = await fetch('assets/data/Islamisk Center Vest - Masjid Salah-Timings.csv');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    const prayerData = parseCSV(csvText);
    
    // Update prayer times
    updatePrayerTimes(prayerData);
    updateTomorrowTimes(prayerData);
    updateCurrentDate();
    
    // Load Friday prayer times
    loadFridayPrayerTimes();
    
    // Update current time every second
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // Update highlighted prayer every minute
    setInterval(() => {
      const today = findTodaysPrayerTimes(prayerData);
      if (today) highlightCurrentPrayer(today);
    }, 60000);
    
    // Initial highlight
    const today = findTodaysPrayerTimes(prayerData);
    if (today) {
      highlightCurrentPrayer(today);
    }
    
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

