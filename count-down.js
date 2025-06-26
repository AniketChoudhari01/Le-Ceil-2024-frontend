const countDown = () => {
    const launchDate = new Date('20 October, 2024 00:00:00').getTime();
    const presentDate = new Date().getTime();
    const difference = launchDate - presentDate;
  
    // Get the second, minute,hour, day
    const second = 1000;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;
  
    const dayText = Math.floor(difference / day);
    const hourText = Math.floor((difference % day) / hour);
    const minuteText = Math.floor((difference % hour) / minute);
    const secondText = Math.floor((difference % minute) / second);
  
    //   add text to the html document 
    document.querySelector('.day').textContent = dayText;
    document.querySelector('.hour').textContent = hourText;
    document.querySelector('.minute').textContent = minuteText;
    document.querySelector('.second').textContent = secondText;
  };
  
  setInterval(countDown, 1000);