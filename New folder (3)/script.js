// Fetch cat data 
async function getCats() {

    const response = await fetch('https://catfact.ninja/breeds');
    const data = await response.json();
  
    // Display first 3 breeds in accordions
    let accordions = '';
    for (let i = 0; i < 3; i++) {
      accordions += `
        <button onclick="toggleAccordion('${data[i].breed}')" class="accordion">${data[i].breed}</button>
        <div class="panel">
          <p>Origin: ${data[i].origin}</p>
          <p>Coat: ${data[i].coat}</p>
          <p>Pattern: ${data[i].pattern}</p>
        </div>
      `;
    }
    document.getElementById('accordions').innerHTML = accordions;
  
    // Display all breeds in table
    let tableRows = ''; 
    data.forEach(cat => {
      tableRows += `
        <tr>
          <td>${cat.breed}</td>
          <td>${cat.origin}</td>
          <td>${cat.coat}</td> 
          <td>${cat.pattern}</td>
        </tr>
      `;
    });
    document.getElementById('catBody').innerHTML = tableRows;
  
  }
  
  // Accordion toggle 
  function toggleAccordion(breed) {
    
    let accordion = document.getElementsByClassName("accordion");
    let i;
  
    for (i = 0; i < accordion.length; i++) {
      accordion[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      });
    }
  }
  
  // Live search/highlight
  let search = document.getElementById('search');
  search.addEventListener('keyup', highlight); 
  
  function highlight() {
    let searchTerm = search.value.toLowerCase();
    let table = document.getElementById('catTable');
    let trs = table.tBodies[0].getElementsByTagName("tr");
    
    // Remove existing highlights
    for (let i = 0; i < trs.length; i++) {
      trs[i].style.backgroundColor = "";
    }
  
    // Search rows    
    for (let i = 0; i < trs.length; i++) {
      let tds = trs[i].getElementsByTagName('td');
      for (let j = 0; j < tds.length; j++) {  
        let td = tds[j];
        if (td) {
          let txtValue = td.textContent || td.innerText;
          if (txtValue.toLowerCase().indexOf(searchTerm) > -1) {
            trs[i].style.backgroundColor = "pink";
          } 
        }
      }
    }
  
  }
  
  // Sort table
  function sortTable(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("catTable");
    switching = true;
    
    dir = "asc"; 
   
    while (switching) {
      
      switching = false;
      rows = table.rows;
      
      for (i = 1; i < (rows.length - 1); i++) {
        
        shouldSwitch = false;
        
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
       
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        
        switchcount ++;      
      } else {
        
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
  
  // Filter table 
  function filterTable(location) {
  
    let filter = location.toLowerCase();
    let table = document.getElementById('catTable');
    let trs = table.tBodies[0].getElementsByTagName("tr");
  
    // Filter rows
    for (let i = 0; i < trs.length; i++) {
      let tds = trs[i].getElementsByTagName('td')[1]; 
      if (tds) {
        let txtValue = tds.textContent || tds.innerText;
        if (filter === 'united states') {
          // Show United States
          if (txtValue.toLowerCase().indexOf('united states') > -1) {
            trs[i].style.display = "";
          } else {
            trs[i].style.display = "none"; 
          }
        } else {
          // Show Other
          if (txtValue.toLowerCase().indexOf('united states') < 0) {
            trs[i].style.display = "";  
          } else {
            trs[i].style.display = "none";
          }
        }
      } 
    }
  }
  
  getCats();