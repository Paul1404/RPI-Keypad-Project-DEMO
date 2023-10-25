document.addEventListener("DOMContentLoaded", function() {
    initKeypad();
    document.getElementById('adminLoginButton').addEventListener('click', function() {
      window.location.href = 'admin_login.html';
    });
  });
  
  let pin = "";
  
  function initKeypad() {
    const keypad = document.getElementById("keypad");
    for (let i = 1; i <= 9; i++) {
      addButton(keypad, i);
    }
    addButton(keypad, 'C', clearPin);
    addButton(keypad, 0);
    addButton(keypad, 'OK', submitPin);
  }
  
  function addButton(keypad, label, action = appendToPin) {
    const button = document.createElement("button");
    button.textContent = label;
    button.className = "keypad-button";
    button.addEventListener("click", function() {
      action(label);
    });
    keypad.appendChild(button);
  }
  
  function appendToPin(number) {
    pin += number;
    document.getElementById("pinDisplay").textContent = pin;
  }
  
  function clearPin() {
    pin = "";
    document.getElementById("pinDisplay").textContent = pin;
  }
  
  async function submitPin() {
    const response = await fetch('/keypad-input', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pin: pin })
    });
    
    if (!response.ok) {
      alert(`Error: ${response.statusText}`);
      return;
    }
  
    const data = await response.json();
    alert(data.message);
    clearPin();
  }
  