class HealthBar {
    constructor(elementId, initialHealth = 100) {
      this.element = document.getElementById(elementId);
      this.health = initialHealth;
      this.update();
      this.attackCount=0;
      this.isOver = false;
    }

    update() {
      this.element.style.width = this.health + "%";
    }
  
    increaseHealth(amount) {
      this.health = Math.min(this.health + amount, 100);
      this.update();
    }
  
    decreaseHealth(amount) {
      this.health = Math.max(this.health - amount, 0);
      this.update();
    }


  }
  
  // Create player and monster health bars
  const playerHealthBar = new HealthBar("player-health", 100);
  const monsterHealthBar = new HealthBar("monster-health", 100);

  function gameOver(){
    if(playerHealthBar.health<=0){
      setTimeout(() => {
        alert("monster has won");
        playerHealthBar.isOver=true;
      }, 300);
      setTimeout(() => {
        document.location.reload(); 
      }, 400);
      
      
    }
    else if(monsterHealthBar.health<=0){
      setTimeout(() => {
        alert("Player has won");
        monsterHealthBar.isOver=true;
      }, 300);
      setTimeout(() => {
        document.location.reload(); 
      }, 400);
      
      
    } 
    
  }
  
  // Handle heal button click
  document.getElementById("heal-button").addEventListener("click", function () {
    const healAmount = Math.floor(Math.random() * 10) + 1;
    if(playerHealthBar.health >0 && playerHealthBar.health<(monsterHealthBar.health*0.70) && playerHealthBar.attackCount>2){
      playerHealthBar.increaseHealth(healAmount);
      const myDiv = document.getElementById("logs");
      const paragraph1 = document.createElement("p");
      paragraph1.innerHTML='<span style="color: red; font-weight: bold">Player </span> healed '+healAmount1+' health';
      myDiv.appendChild(paragraph2);
      gameOver();
    }else{
      alert('Cannot Heal');
    }
  });
  
  // Handle damage button click
  document.getElementById("damage-button").addEventListener("click", function () {
    const damageAmount1 = Math.floor(Math.random() * 20) + 1;
    const damageAmount2 = Math.floor(Math.random() * 10) + 1;
    playerHealthBar.decreaseHealth(damageAmount1);
    ++playerHealthBar.attackCount;
    monsterHealthBar.decreaseHealth(damageAmount2);
    ++monsterHealthBar.attackCount;
    const myDiv = document.getElementById("logs");
    const paragraph3 = document.createElement("p");
    paragraph3.innerHTML ='<span style="color: red; font-weight: bold">Monster </span> lost '+damageAmount2+' health';
    myDiv.appendChild(paragraph3);
    console.log(paragraph3);
    const paragraph4 = document.createElement("p");
    paragraph4.innerHTML ='<span style="color: red; font-weight: bold">Player </span> lost '+damageAmount1+' health';
    myDiv.appendChild(paragraph4);
    gameOver();
  });

  // Handle special Attack button click
  document.getElementById("Special-button").addEventListener("click", function () {
    let maxUsed = 0;
    const damageAmount = 50;
    if(monsterHealthBar.attackCount>2 && maxUsed<2){
      monsterHealthBar.decreaseHealth(damageAmount);
      const myDiv = document.getElementById("logs");
      const paragraph5 = document.createElement("p");
      paragraph5.innerHTML='<span style="color: red; font-weight: bold">Player </span> healed '+damageAmount+' health';
      myDiv.appendChild(paragraph5);
      gameOver();
      
    }else{
      alert('Cannot use right now');
    }
  });

  document.getElementById("giveUp-button").addEventListener("click", function () {
    playerHealthBar.health=0;
    gameOver();
  });