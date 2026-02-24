
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  Timestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 YOUR FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyDNBFd33qARKgOyNzznWCQmd-jXd0iMduo",
  authDomain: "restaurant-d8a5e.firebaseapp.com",
  projectId: "restaurant-d8a5e",
  storageBucket: "restaurant-d8a5e.firebasestorage.app",
  messagingSenderId: "441672509290",
  appId: "1:441672509290:web:6e037f64aaf969283c2713",
  measurementId: "G-GW4C73JVTV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tbody = document.querySelector("#ordersTable tbody");
const grandTotalEl = document.getElementById("grandTotal");

/* LOAD ORDERS */
document.getElementById("loadBtn").addEventListener("click", loadOrders);

async function loadOrders() {
  const dateValue = document.getElementById("orderDate").value;
  if (!dateValue) {
    alert("Please select date");
    return;
  }

  tbody.innerHTML = "";
  let grandTotal = 0;

  const start = new Date(dateValue);
  start.setHours(0, 0, 0, 0);

  const end = new Date(dateValue);
  end.setHours(23, 59, 59, 999);

  const q = query(
    collection(db, "orders"),
    where("createdAt", ">=", Timestamp.fromDate(start)),
    where("createdAt", "<=", Timestamp.fromDate(end))
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const data = doc.data();
    grandTotal += data.total;

    const itemsText = data.items
      .map(i => `${i.name} (${i.qty})`)
      .join(", ");

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${new Date(data.createdAt.seconds * 1000).toLocaleDateString()}</td>
      <td>${data.tableNo}</td>
      <td>${itemsText}</td>
      <td>${data.total}</td>
    `;
    tbody.appendChild(tr);
  });

  grandTotalEl.textContent = grandTotal;
}

/* DOWNLOAD PDF */
document.getElementById("pdfBtn").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Customer Orders Report", 14, 15);

  doc.autoTable({
    startY: 20,
    html: "#ordersTable"
  });

  doc.save("orders-report.pdf");
});
