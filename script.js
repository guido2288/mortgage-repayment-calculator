const form = document.getElementById('form');
const clear = document.getElementById('clear')
const amount = form.elements['amount'];
const years = form.elements['years'];
const interest = form.elements['interest'];
const repayment = document.getElementById("repayment");
const interestOnly = document.getElementById("interestOnly");
const resultDisplay = document.getElementById("result-display");

clear.addEventListener('click' , () => {
    form.reset();

    resultDisplay.innerHTML = `
            <img src="./assets/images/illustration-empty.svg" alt="illustration-empty">
            <h2>Results shown here</h2>
            <p>Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p> 
    `
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


    let result = calculatePayement(amount.value , interest.value , years.value , repayment.value);

    console.log(result)

    resultDisplay.innerHTML = `
        <div class="result-display" >
            <h2>Your results</h2>
            <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
            <div class="result">

              <div class="result-top">
                <p>Your monthly repayments</p>
                <h2>£${Math.round(result.monthlyPayment * 100) / 100}</h2>
              </div>

              <div class="result-bottom">
                <p>Total you'll repay over the term</p>
                <h3>£${Math.round(result.totalRepayement * 100) / 100}</h3>
              </div>


            </div>

        </div>
    `

    
    
} )