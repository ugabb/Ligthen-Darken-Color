const hexInput = document.getElementById("hex-input");
const inputColor = document.getElementById("input-color");
const alteredColorBox = document.getElementById("altered-color");
const sliderText = document.getElementById('slider-text');
const slider = document.getElementById('slider');


hexInput.addEventListener('keyup', () =>{
    const hex = hexInput.value;
    if(!validHex(hex)) return;

    const strippedHex = hex.replace('#','');

    inputColor.style.backgroundColor = "#" + strippedHex;
})


const validHex = (hex) =>{
    if(!hex) return false;
    const strippedHex = hex.replace('#','');
    return strippedHex.length === 3 || strippedHex.length === 6;
}


const convertHexToRGB = (hex) => {
    if(!validHex(hex)) return null;
    
    let strippedHex = hex.replace('#','');
    
    if(strippedHex.length === 3) {
      strippedHex = strippedHex[0] + strippedHex[0]
      + strippedHex[1] + strippedHex[1]
      + strippedHex[2] + strippedHex[2];
    }
    const r = parseInt(strippedHex.substring(0,2)/*indices*/,16)
    const g = parseInt(strippedHex.substring(2,4)/*indices*/,16)
    const b = parseInt(strippedHex.substring(4,6)/*indices*/,16)

    return {r,g,b}
  }

  const convertRGBToHex = (r,g,b) => {
      const fisrtPair = ("0" + r.toString(16)).slice(-2);
      const secondPair = ("0" + g.toString(16)).slice(-2);
      const thirdPair = ("0" + b.toString(16)).slice(-2);

      const hex = '#' + fisrtPair + secondPair + thirdPair;
      return hex;
}

const alteredColor = (hex,percentage) => {
    const {r,g,b} = convertHexToRGB(hex);

    const amount = Math.floor((percentage /100) * 255);

    const newR = increaseWithin0To255(r,amount);
    const newG = increaseWithin0To255(g,amount);
    const newB = increaseWithin0To255(b,amount);
    return convertRGBToHex(newR,newG,newB);
}

const increaseWithin0To255 = (hex, amount) => {
  return Math.min(255, Math.max(0, hex + amount));
}

//console.log(alteredColor("000", 100));


slider.addEventListener('input',() => {
  if(!validHex(hexInput.value)) return;
  
  sliderText.textContent = `${slider.value}%`;

  const alteredHex = alteredColor(hexInput.value,slider.value);
  console.log(alteredHex)
  alteredColorBox.style.backgroundColor = alteredHex;
})
