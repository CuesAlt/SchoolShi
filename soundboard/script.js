const buttonsContainer = document.querySelector('.buttons');

const buttons = [
  { text: 'Lol', audioClass: 'Lol', soundUrl: 'sounds/lol.mp3' },
  { text: 'We Dont Care', audioClass: 'We Dont Care', soundUrl: 'sounds/wedontcare.mp3' },
  { text: 'Erika', audioClass: 'Erika', soundUrl: 'sounds/erica.mp3' },
  { text: 'Boo', audioClass: 'Boo', soundUrl: 'sounds/boo.mp3},
  { text: 'Yay', audioClass: 'Yay', soundUrl: 'sounds/yay.mp3' },
  { text: 'Tada', audioClass: 'Tada', soundUrl: 'sounds/tada.mp3' },
  { text: 'Victory', audioClass: 'Victory', soundUrl: 'sounds/victory.mp3' },
  { text: 'Wrong', audioClass: 'Wrong', soundUrl: 'sounds/wrong.mp3' },
  { text: 'Alarm', audioClass: 'Alarm', soundUrl: 'sounds/alarm.mp3' },
  { text: 'BuDumTss', audioClass: 'BuDumTss', soundUrl: 'sounds/budumtss.mp3' },
  { text: 'Woof', audioClass: 'Woof', soundUrl: 'sounds/woof.mp3' },
  { text: 'Laugh', audioClass: 'Laugh', soundUrl: 'sounds/laugh.mp3' },
  { text: 'TskTsk', audioClass: 'TskTsk', soundUrl: 'sounds/tsktsk.mp3' },
  { text: 'Sneeze', audioClass: 'Sneeze', soundUrl: 'sounds/sneeze.mp3' },
  { text: 'Orchestra', audioClass: 'Orchestra', soundUrl: 'sounds/orchestra.mp3' },
  { text: 'Trumpets', audioClass: 'Trumpets', soundUrl: 'sounds/trumpets.mp3' },
  { text: 'Yawn', audioClass: 'Yawn', soundUrl: 'sounds/yawn.mp3' },
  { text: 'Crunch', audioClass: 'Crunch', soundUrl: 'sounds/crunch.mp3' },
  { text: 'Mystery', audioClass: 'Mystery', soundUrl: 'sounds/mystery.mp3' },
  { text: 'Videogame', audioClass: 'Videogame', soundUrl: 'sounds/videogame.mp3' },
  { text: 'WarHorn', audioClass: 'WarHorn', soundUrl: 'sounds/warhorn.mp3' },
  { text: 'Thunder', audioClass: 'Thunder', soundUrl: 'sounds/thunder.mp3' },
  { text: 'Horror', audioClass: 'Horror', soundUrl: 'sounds/horror.mp3' }
];

for (let i = 0; i < 5; i++) {
  const row = document.createElement('div');
  row.className = 'row';
  buttonsContainer.appendChild(row);

  for (let j = 0; j < 5; j++) {
    const button = document.createElement('button');
    button.className = 'button';
    button.textContent = buttons[i * 5 + j].text;
    button.addEventListener('click', () => {
      const audio = new Audio(buttons[i * 5 + j].soundUrl);
      audio.play();
    });
    row.appendChild(button);
  }
}
