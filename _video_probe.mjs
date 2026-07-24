// Quick probe of the MP4 file header to extract codec, resolution, duration
import { readFileSync } from 'fs';

const buf = readFileSync('src/assets/home/Max-Seal.mp4');
const sizeBytes = buf.length;
const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(2);

console.log(`File size: ${sizeBytes} bytes (${sizeMB} MB)`);

// Parse MP4 boxes (atoms) to find metadata
function readUint32(b, offset) {
  return (b[offset] << 24) | (b[offset+1] << 16) | (b[offset+2] << 8) | b[offset+3];
}

function fourCC(b, offset) {
  return String.fromCharCode(b[offset], b[offset+1], b[offset+2], b[offset+3]);
}

// Walk the MP4 box tree to find moov > trak > mdia > minf > stbl > stsd
// and moov > mvhd for duration
function walkBoxes(b, start, end, depth = 0, path = '') {
  let pos = start;
  while (pos < end - 8) {
    let size = readUint32(b, pos);
    const type = fourCC(b, pos + 4);
    
    if (size === 0) break;
    if (size === 1) {
      // 64-bit size - skip for simplicity
      break;
    }
    
    const boxEnd = pos + size;
    const currentPath = path + '/' + type;
    
    // mvhd - movie header: contains timescale and duration
    if (type === 'mvhd') {
      const version = b[pos + 8];
      let timescale, duration;
      if (version === 0) {
        timescale = readUint32(b, pos + 20);
        duration = readUint32(b, pos + 24);
      } else {
        // version 1 uses 64-bit values
        timescale = readUint32(b, pos + 28); // approximate
        duration = readUint32(b, pos + 36);  // lower 32 bits
      }
      const seconds = duration / timescale;
      console.log(`Duration: ${seconds.toFixed(2)}s (${Math.floor(seconds/60)}m ${Math.floor(seconds%60)}s)`);
      console.log(`Timescale: ${timescale}`);
    }
    
    // tkhd - track header: contains width/height
    if (type === 'tkhd') {
      const version = b[pos + 8];
      let w, h;
      if (version === 0) {
        w = readUint32(b, pos + 76) >> 16;
        h = readUint32(b, pos + 80) >> 16;
      } else {
        w = readUint32(b, pos + 88) >> 16;
        h = readUint32(b, pos + 92) >> 16;
      }
      if (w > 0 && h > 0) {
        console.log(`Resolution: ${w}x${h}`);
      }
    }
    
    // stsd - sample description: contains codec info
    if (type === 'stsd') {
      const entryCount = readUint32(b, pos + 12);
      if (entryCount > 0) {
        const codecType = fourCC(b, pos + 20);
        console.log(`Codec identifier: ${codecType}`);
      }
    }
    
    // Container boxes - recurse into them
    const containers = ['moov', 'trak', 'mdia', 'minf', 'stbl', 'edts', 'dinf'];
    if (containers.includes(type)) {
      walkBoxes(b, pos + 8, Math.min(boxEnd, end), depth + 1, currentPath);
    }
    
    pos = boxEnd;
  }
}

walkBoxes(buf, 0, buf.length);

// Check if moov atom is at the beginning (fast-start)
let moovPos = -1;
let mdatPos = -1;
let pos = 0;
while (pos < Math.min(buf.length, 100000000)) {
  const size = readUint32(buf, pos);
  const type = fourCC(buf, pos + 4);
  if (size === 0) break;
  if (type === 'moov') { moovPos = pos; }
  if (type === 'mdat') { mdatPos = pos; }
  if (moovPos >= 0 && mdatPos >= 0) break;
  pos += size;
}

if (moovPos >= 0 && mdatPos >= 0) {
  console.log(`moov atom position: ${moovPos}`);
  console.log(`mdat atom position: ${mdatPos}`);
  console.log(`Fast-start (moov before mdat): ${moovPos < mdatPos ? 'YES ✓' : 'NO ✗ — needs qt-faststart'}`);
}

// Bitrate estimate
// We'll use the values we parsed
