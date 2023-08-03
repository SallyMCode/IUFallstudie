  
  //Die Suchleiste für die Tabelle
  function tabelleFilter() {
    // Die Variablen
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("eingabe");
    filter = input.value.toUpperCase();
    table = document.getElementById("tabelleJs");
    tr = table.getElementsByTagName("tr");
  
    // Die Schleife für die einzelnen Zeilen der Tabelle. Die Elemente, die nicht aktiv sind, werden verborgen
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText; /*inner.Text als Sicherheit vor injizierten Code*/
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

//Die Sortierfunktion für die Tabelle durch klicken auf den Header der Tabelle
function sortieren(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("tabelleJs");
    switching = true;
    // Aufsteigende Reihenfolge für die Sortierfunktion:
    dir = "asc";
    /* Die Implementierung der Schleife */
    while (switching) {
    // Die Schleife beginnt, sofern noch kein Durchlauf gestartet wurde
      switching = false;
      rows = table.rows;
      /* Die Schleife geht durch alle Tabellenzeilen bis auf den Header der Tabelle */
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        /* Die zwei zu vergleichenden Elemente */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Überprüfung, ob die beiden Elemente , die Platz tauschen sollten: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // Wenn die beiden Elemente, den Platz tauschen, wird die Schleife abgebrochen
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // Andernfalls werden die Elemente nicht gewechselt und die Schleife bricht ab
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* Immer wenn die Elemente getauscht wurden, wird dies mitgezählt */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Der Schleifenzähler wird immer um 1 erhöht, wenn die Schleife durchlaufen wurde
        switchcount ++;
      } else {
        /* Wenn die Elemente nicht getauscht werden und die Reihenfolge aufsteigend ist, 
        wird die Reihenfolge in absteigend geändert und die Schleife erneut durchlaufen */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  /* Eine Filterfunktion für die Tabelle*/
  filterSelection("alle")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "alle") c = "";
  // Die "show"-Klasse wird den gefilterten Elementen zugeordnet und den nicht gefilterten nicht
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Die gefilterten Elemente werden angezeigt
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Nicht gefilterte Elemente werden nicht angezeigt
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

//Der Schalter, der aktiviert ist, erhält die dunkelgrüne Färbung
var filterTabelle = document.getElementById("filterTabelle");
var knopf = filterTabelle.getElementsByClassName("knopf");
for (var i = 0; i < knopf.length; i++) {
  knopf[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("alle");
    current[0].className = current[0].className.replace(" alle", "");
    this.className += " alle";
  });
}