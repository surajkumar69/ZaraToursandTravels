const fs = require('fs');
const https = require('https');
const path = require('path');

const imagesToDownload = [
  { name: 'hero.jpg', prompt: 'Cinematic photorealistic landscape of Ooty Nilgiri mountains green tea gardens morning mist winding mountain road premium tourist vehicle', w: 1920, h: 1080 },
  { name: 'about.jpg', prompt: 'Premium white tourist vehicle parked at scenic viewpoint Ketti Valley Ooty lush green tea estates luxury travel', w: 1024, h: 768 },
  { name: 'sedan.jpg', prompt: 'White luxury sedan car parked on Ooty mountain road photorealistic', w: 800, h: 600 },
  { name: 'bolero.jpg', prompt: 'White Mahindra Bolero SUV parked in green tea garden Ooty photorealistic', w: 800, h: 600 },
  { name: 'xylo.jpg', prompt: 'White Mahindra Xylo MPV car on scenic mountain road photorealistic', w: 800, h: 600 },
  { name: 'innova.jpg', prompt: 'White Toyota Innova Crysta car parked near Ooty lake photorealistic', w: 800, h: 600 },
  { name: 'tempo.jpg', prompt: 'White Force Tempo Traveller tourist van on Ooty hills photorealistic', w: 800, h: 600 },
  { name: 'van.jpg', prompt: 'White 21 seater tourist minibus parked in Ooty photorealistic', w: 800, h: 600 },
  { name: 'bus.jpg', prompt: 'Premium white 30 seater tourist bus on mountain road photorealistic', w: 800, h: 600 },
  
  { name: 'dest_ooty.jpg', prompt: 'Photorealistic landscape of Ooty Queen of Hill Stations beautiful lake and hills', w: 800, h: 800 },
  { name: 'dest_coonoor.jpg', prompt: 'Coonoor tea gardens and scenic valleys mist photorealistic', w: 800, h: 800 },
  { name: 'dest_ketti.jpg', prompt: 'Ketti Valley Switzerland of Southern India beautiful green hills photorealistic', w: 800, h: 800 },
  { name: 'dest_kotagiri.jpg', prompt: 'Kotagiri peaceful hill retreat tea estates photorealistic', w: 800, h: 800 },
  { name: 'dest_coimbatore.jpg', prompt: 'Coimbatore city aerial view sunny day photorealistic', w: 800, h: 800 },
  { name: 'dest_mysore.jpg', prompt: 'Mysore palace beautiful heritage city photorealistic', w: 800, h: 800 },
  { name: 'dest_bangalore.jpg', prompt: 'Bangalore garden city modern skyline parks photorealistic', w: 800, h: 800 },
  { name: 'dest_wayanad.jpg', prompt: 'Wayanad Kerala green paradise waterfalls nature photorealistic', w: 800, h: 800 },
  
  { name: 'ooty_lake.jpg', prompt: 'Ooty Lake beautiful boating sunny day photorealistic', w: 1000, h: 1000 },
  { name: 'ooty_tea.jpg', prompt: 'Ooty lush green tea gardens landscape photorealistic', w: 800, h: 800 },
  { name: 'ooty_peak.jpg', prompt: 'Doddabetta Peak Ooty stunning viewpoint photorealistic', w: 800, h: 800 },
  { name: 'ooty_rail.jpg', prompt: 'Nilgiri Mountain Railway toy train in Ooty forest photorealistic', w: 800, h: 800 },
  
  { name: 'banner.jpg', prompt: 'Wide cinematic shot of empty winding mountain road in Nilgiris surrounded by lush green tea gardens and mist luxury travel mood', w: 1920, h: 800 },
  
  { name: 'gallery1.jpg', prompt: 'Family enjoying vacation in Ooty tea gardens photorealistic', w: 1000, h: 800 },
  { name: 'gallery2.jpg', prompt: 'Group of tourists beside a white tourist van in Nilgiris photorealistic', w: 1000, h: 800 },
  { name: 'gallery3.jpg', prompt: 'Scenic mountain road in Ooty with a premium car driving photorealistic', w: 1000, h: 800 },
  { name: 'map.jpg', prompt: 'Artistic 3D styled map representation of Ketti Ooty travel location', w: 800, h: 600 }
];

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  for (const img of imagesToDownload) {
    const dest = path.join(dir, img.name);
    // Skip if file already exists and has content
    if (fs.existsSync(dest)) {
      const stats = fs.statSync(dest);
      if (stats.size > 1000) { // arbitrary small size to ensure it's not an empty failed file
        console.log(`Skipping ${img.name}, already exists.`);
        continue;
      }
    }

    const encodedPrompt = encodeURIComponent(img.prompt);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${img.w}&height=${img.h}&nologo=true`;
    
    console.log(`Downloading ${img.name}...`);
    let success = false;
    let attempts = 0;
    while (!success && attempts < 3) {
      try {
        attempts++;
        await download(url, dest);
        console.log(`Success: ${img.name}`);
        success = true;
      } catch (e) {
        console.error(`Error downloading ${img.name} (Attempt ${attempts}):`, e.message);
        await sleep(2000); // wait before retry
      }
    }
    
    // add delay between successful downloads to avoid overwhelming the server
    await sleep(2000);
  }
  console.log("All AI images downloaded/verified.");
}

run();
