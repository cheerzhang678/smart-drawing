const fs = require('fs');
const content = fs.readFileSync('prototype-smart-drawing.html', 'utf8');

// 修复 toggleRatio 函数
const oldFunction = `function toggleRatio(id) {
  event.stopPropagation();
  const dd = document.getElementById(id);
  document.querySelectorAll('.ratio-dropdown').forEach(d => { if (d.id !== id) d.classList.remove('open'); });
  dd.classList.toggle('open');
}`;

const newFunction = `function toggleRatio(id) {
  event.stopPropagation();
  const dd = document.getElementById(id);
  const selector = dd.parentElement;
  document.querySelectorAll('.ratio-dropdown').forEach(d => {
    if (d.id !== id) {
      d.classList.remove('open');
      d.parentElement.classList.remove('open');
    }
  });
  dd.classList.toggle('open');
  selector.classList.toggle('open', dd.classList.contains('open'));
}`;

const newContent = content.replace(oldFunction, newFunction);
fs.writeFileSync('prototype-smart-drawing.html', newContent);
console.log('Done');
