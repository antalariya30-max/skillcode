// const counters = document.querySelectorAll('.count');

// counters.forEach(counter => {
//   const target = +counter.getAttribute('data-target');
//   let count = 0;

//   const updateCount = () => {
//     const increment = target / 100;

//     if (count < target) {
//       count += increment;
//       counter.innerText = Math.ceil(count);
//       setTimeout(updateCount, 20);
//     } else {
//       counter.innerText = target;
//     }
//   };

//   updateCount();
// });
function startCounter() {

  const counters = document.querySelectorAll('.count');

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;

    const updateCount = () => {
      const increment = target / 100;

      if (count < target) {
        count += increment;
        counter.innerText = Math.ceil(count);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });

}
function formatNumber(num){
  if(num === 75) return "$" + num + "million";
  if(num === 97) return num + "%";
  if(num === 2000) return num + "+";
  return num;
}   
