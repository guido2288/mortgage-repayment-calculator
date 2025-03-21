const form = document.getElementById('form');
const clear = document.getElementById('clear')
const amount = form.elements['amount'];
const years = form.elements['years'];
const interest = form.elements['interest'];
const repayment = document.getElementById("repayment");
const interestOnly = document.getElementById("interestOnly");

clear.addEventListener('click' , () => {
    form.reset();
});

function calculatePayement(amount, rate, term, type) {
    const principal = parseFloat(amount);
  
    const monthlyInterestRate = parseFloat(rate) / 100 / 12;
  
    const numberOfPeriods = parseFloat(term) * 12;
  
    let monthlyPayment;
    let totalRepayement;
  
    if(type === "interest-only") {
      monthlyPayment = principal * monthlyInterestRate;
      totalRepayement = (monthlyPayment * numberOfPeriods) + principal;
    } else {
      if(monthlyInterestRate === 0) {
        monthlyPayment = principal / numberOfPeriods; 
      } else {
        const factor = Math.pow(1 + monthlyInterestRate, numberOfPeriods);
        monthlyPayment = (principal * monthlyInterestRate * factor) / (factor - 1);
      }
      totalRepayement = monthlyPayment * numberOfPeriods;
    }
  
    return {
      monthlyPayment,
      totalRepayement,
    };
  }


form.addEventListener( 'submit', (e) => {
    e.preventDefault();


    calculatePayement(amount.value , interest.value , years.value , repayment.value)
} )