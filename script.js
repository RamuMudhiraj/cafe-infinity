/***********************
 GOOGLE SHEET WEB APP
************************/
const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxbg_jImX9zmSf9IQ8iI9_R1pdpLefuV6r8XdzaIXEEFy0Czqb_RE5xq4hJ32sfm5lU_g/exec";

/***********************
 NAVBAR
************************/
const navbar = document.getElementById("navbar");
if (navbar) {
  navbar.innerHTML = `
    <div style="background:#2e86de;color:#fff;padding:12px 20px;display:flex;justify-content:space-between">
      <b>Cafe Infinity</b>
      <div>
        <a href="index.html" style="color:white;margin-right:15px">Tables</a>
        <a href="orders.html" style="color:white">Customers</a>
      </div>
    </div>
  `;
}

/***********************
 TABLES PAGE
************************/
const tablesContainer = document.getElementById("tables-container");
if (tablesContainer) {
  for (let i = 1; i <= 20; i++) {
    const btn = document.createElement("button");
    btn.innerText = "Table " + i;
    btn.style.margin = "10px";
    btn.style.padding = "15px";

    if (sessionStorage.getItem("table_" + i)) {
      btn.style.background = "yellow";
    }

    btn.onclick = () => {
      location.href = "menu.html?table=" + i;
    };

    tablesContainer.appendChild(btn);
  }
}

/***********************
 MENU PAGE
************************/
const params = new URLSearchParams(location.search);
const tableNo = params.get("table");

if (tableNo) {
  document.getElementById("table-number").innerText = tableNo;

  const menuList = document.getElementById("menu-list");
  const cartBody = document.getElementById("cart-body");
  const totalEl = document.getElementById("grand-total");
  const invoiceBox = document.getElementById("invoice");

  /******** MENU DATA ********/
  const MENU = {
CHICKEN: [ { name: "Chicken Fried Mandi - 1 Piece", price: 229 }, { name: "Chicken Fried Mandi - 2 Piece", price: 399 }, { name: "Chicken Fried Mandi - 3 Piece", price: 568 }, { name: "Chicken Fried Mandi - 4 Piece", price: 729 }, { name: "Broasted Chicken Mandi - 1 Piece", price: 259 }, { name: "Broasted Chicken Mandi - 2 Piece", price: 429 }, { name: "Broasted Chicken Mandi - 3 Piece", price: 599 }, { name: "Broasted Chicken Mandi - 4 Piece", price: 759 }, { name: "Crispy Chicken Mandi - 1 Piece", price: 269 }, { name: "Crispy Chicken Mandi - 2 Piece", price: 459 }, { name: "Crispy Chicken Mandi - 3 Piece", price: 629 }, { name: "Crispy Chicken Mandi - 4 Piece", price: 799 }, { name: "Chicken Juicy Mandi - 1 Piece", price: 299 }, { name: "Chicken Juicy Mandi - 2 Piece", price: 499 }, { name: "Chicken Juicy Mandi - 3 Piece", price: 679 }, { name: "Chicken Juicy Mandi - 4 Piece", price: 849 } ], MUTTON: [ { name: "Mutton Fried Mandi - 1 Piece", price: 299 }, { name: "Mutton Fried Mandi - 2 Piece", price: 529 }, { name: "Mutton Fried Mandi - 3 Piece", price: 729 }, { name: "Mutton Fried Mandi - 4 Piece", price: 919 }, { name: "Mutton Juicy Mandi - 1 Piece", price: 349 }, { name: "Mutton Juicy Mandi - 2 Piece", price: 579 }, { name: "Mutton Juicy Mandi - 3 Piece", price: 839 }, { name: "Mutton Juicy Mandi - 4 Piece", price: 1049 } ], "SEA FOOD": [ { name: "Fish Fry Piece Mandi - 1 Piece", price: 269 }, { name: "Fish Fry Piece Mandi - 2 Piece", price: 499 }, { name: "Fish Fry Piece Mandi - 3 Piece", price: 699 }, { name: "Fish Fry Piece Mandi - 4 Piece", price: 899 }, { name: "Loose Prawns Mandi - 1 Piece", price: 299 }, { name: "Loose Prawns Mandi - 2 Piece", price: 549 }, { name: "Loose Prawns Mandi - 3 Piece", price: 779 }, { name: "Loose Prawns Mandi - 4 Piece", price: 999 } ], SPECIAL: [ { name: "Cafe Infinity Special Mandi - 1 Piece", price: 289 }, { name: "Cafe Infinity Special Mandi - 2 Piece", price: 529 }, { name: "Cafe Infinity Special Mandi - 3 Piece", price: 719 }, { name: "Cafe Infinity Special Mandi - 4 Piece", price: 919 }, { name: "Chicken Ghee Roast Mandi - 1 Piece", price: 299 }, { name: "Chicken Ghee Roast Mandi - 2 Piece", price: 449 }, { name: "Chicken Ghee Roast Mandi - 3 Piece", price: 819 }, { name: "Chicken Ghee Roast Mandi - 4 Piece", price: 869 }, { name: "Chicken 65 Mandi - 1 Piece", price: 289 }, { name: "Chicken 65 Mandi - 2 Piece", price: 529 }, { name: "Chicken 65 Mandi - 3 Piece", price: 689 }, { name: "Chicken 65 Mandi - 4 Piece", price: 849 }, { name: "Mutton Ghee Roast Mandi - 1 Piece", price: 369 }, { name: "Mutton Ghee Roast Mandi - 2 Piece", price: 609 }, { name: "Mutton Ghee Roast Mandi - 3 Piece", price: 869 }, { name: "Mutton Ghee Roast Mandi - 4 Piece", price: 1079 } ], VEG: [ { name: "Paneer Mandi - 1 Piece", price: 249 }, { name: "Paneer Mandi - 2 Piece", price: 399 }, { name: "Paneer Mandi - 3 Piece", price: 569 }, { name: "Paneer Mandi - 4 Piece", price: 729 }, { name: "French Fries Mandi - 1 Piece", price: 199 }, { name: "French Fries Mandi - 2 Piece", price: 329 }, { name: "French Fries Mandi - 3 Piece", price: 479 }, { name: "French Fries Mandi - 4 Piece", price: 629 } ], OTHERS: [ { name: "Water Bottle", price: 25 }, { name: "Thumbs Up", price: 25 }, { name: "Sprite", price: 25 }, { name: "Coca Cola", price: 25 }, { name: "mayonnaise", price: 40 }, { name: "chilli chicken", price: 160 } ]
  };

  let cart = JSON.parse(sessionStorage.getItem("table_" + tableNo)) || [];

  /***********************
   CATEGORY ROW (6 IN ONE LINE)
  ************************/
  const categoryRow = document.createElement("div");
  categoryRow.style.display = "grid";
  categoryRow.style.gridTemplateColumns = "repeat(6, 1fr)";
  categoryRow.style.gap = "10px";
  categoryRow.style.marginBottom = "15px";

  menuList.appendChild(categoryRow);

  Object.keys(MENU).forEach(cat => {
    const btn = document.createElement("button");
    btn.innerText = cat;
    btn.style.padding = "12px";
    btn.style.fontWeight = "bold";
    btn.onclick = () => loadCategory(cat);
    categoryRow.appendChild(btn);
  });

  /***********************
   ITEMS GRID (4 PER ROW)
  ************************/
  const itemsGrid = document.createElement("div");
  itemsGrid.style.display = "grid";
  itemsGrid.style.gridTemplateColumns = "repeat(4, 1fr)";
  itemsGrid.style.gap = "12px";
  menuList.appendChild(itemsGrid);

  function loadCategory(category) {
    itemsGrid.innerHTML = "";

    MENU[category].forEach(item => {
      const btn = document.createElement("button");
      btn.className = "item-btn";
      btn.innerHTML = `<b>${item.name}</b><br>₹${item.price}`;
      btn.style.padding = "12px";
      btn.style.borderRadius = "8px";
      btn.onclick = () => addItem(item);
      itemsGrid.appendChild(btn);
    });
  }

  function addItem(item) {
    const found = cart.find(i => i.name === item.name);
    found ? found.qty++ : cart.push({ ...item, qty: 1 });
    save();
  }

  function save() {
    sessionStorage.setItem("table_" + tableNo, JSON.stringify(cart));
    render();
  }

  function render() {
    cartBody.innerHTML = "";
    let total = 0;

    cart.forEach((i, idx) => {
      const t = i.qty * i.price;
      total += t;
      cartBody.innerHTML += `
        <tr>
          <td>${i.name}</td>
          <td>
            <button onclick="changeQty(${idx},-1)">-</button>
            ${i.qty}
            <button onclick="changeQty(${idx},1)">+</button>
          </td>
          <td>₹${i.price}</td>
          <td>₹${t}</td>
        </tr>
      `;
    });

    totalEl.innerText = "Grand Total: ₹" + total;
    renderInvoice(total);
  }

  window.changeQty = (i, v) => {
    cart[i].qty += v;
    if (cart[i].qty <= 0) cart.splice(i, 1);
    save();
  };

  function renderInvoice(total) {
    invoiceBox.innerHTML = `
      <div style="width:260px;font-family:monospace">
        <h3 style="text-align:center">Cafe Infinity</h3>
        <p style="text-align:center">Table ${tableNo}</p>
        <hr>
        ${cart.map(i => `
          <div style="display:flex;justify-content:space-between">
            <span>${i.name} x${i.qty}</span>
            <span>₹${i.qty * i.price}</span>
          </div>
        `).join("")}
        <hr>
        <b style="display:flex;justify-content:space-between">
          <span>TOTAL</span>
          <span>₹${total}</span>
        </b>
      </div>
    `;
  }

  document.getElementById("submitBtn").onclick = () => {
    if (!cart.length) return alert("Cart empty");

    fetch(SHEET_URL, {
      method: "POST",
      body: JSON.stringify({
        table: "Table " + tableNo,
        items: cart.map(i => `${i.name} x${i.qty}`).join(", "),
        quantity: cart.reduce((s, i) => s + i.qty, 0),
        total: cart.reduce((s, i) => s + i.qty * i.price, 0)
      })
    }).then(() => {
      alert("Order Saved");
      sessionStorage.removeItem("table_" + tableNo);
      location.href = "index.html";
    });
  };

  loadCategory("CHICKEN");
  render();
}


// gy hoi
/***********************
 PRINT / DOWNLOAD / REFRESH
************************/

const printBtn = document.getElementById("printBtn");
const downloadBtn = document.getElementById("downloadBtn");
const refreshBtn = document.getElementById("refreshBtn");

/* PRINT INVOICE */
if (printBtn) {
  printBtn.onclick = () => {
    const printContent = document.getElementById("invoice").innerHTML;
    const win = window.open("", "", "width=400,height=600");
    win.document.write(`
      <html>
        <head>
          <title>Print Invoice</title>
        </head>
        <body onload="window.print();window.close()">
          ${printContent}
        </body>
      </html>
    `);
    win.document.close();
  };
}

/* DOWNLOAD INVOICE (TXT FILE) */
if (downloadBtn) {
  downloadBtn.onclick = () => {
    const text = document.getElementById("invoice").innerText;
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `Table_${tableNo}_Invoice.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
}

/* REFRESH PAGE */
if (refreshBtn) {
  refreshBtn.onclick = () => {
    location.reload();
  };
}
