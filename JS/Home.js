// dangnhap & dangky
function dangky(e){
  event.preventDefault();
  let username = document.getElementById("name").value;
  let useremail = document.getElementById("email").value;
  let userphone = document.getElementById("phone").value;
  let userpassword = document.getElementById("password").value;
  let userconfirmPassword = document.getElementById("confirmPassword").value;
  let user = {
    username : username,
    useremail : useremail,
    userphone: userphone,
    userpassword: userpassword,
    userconfirmPassword: userconfirmPassword
  }
  let json = JSON.stringify(user);
  localStorage.setItem(username,json);
  alert("Đăng Ký Thành Công")
  window.location.href="dangnhap.html"
}
function dangnhap(event){
  event.preventDefault();
  let username = document.getElementById("username").value;
  let useremail = document.getElementById("email").value;
  let userpassword = document.getElementById("password").value;
  let user = localStorage.getItem(username);
  let data = JSON.parse(user);
  if(data == null){
    alert("Tài Khoản Không Tồn Tại! Vui Lòng Nhập lại");
  }
  else if(username === data.username && useremail === data.useremail && userpassword === data.userpassword){
    alert("Đăng Nhập Thành Công");
    window.location.href="trangchu.html";
  }
  else{
    alert("Đăng Nhập Thất Bại");
  }
}



// Function to fetch data from JSON file
function fetchData(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Function to display products
function displayProducts(products) {
  const productList = document.querySelector(".produc");
  productList.innerHTML = "";

  products.forEach((product) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
                          <div class="produc-item">
                              <div class="produc-top">
                                  <a href="sanpham.html" class="produc-thumb">
                                      <img src="${product.image}" alt="${
      product.name
    }" />
                                  </a>
                              </div>
                              <div class="produc-info">
                                  <a href="sanpham.html" class="produc-name">${
                                    product.name
                                  }</a>
                                  <div class="produc-category">${
                                    product.category
                                  }</div>
                                  <div class="produc-price">Giá: ${parseFloat(
                                    product.price
                                  )
                                    .toFixed(0)
                                    .replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      ","
                                    )}đ</div>
                              </div>
                          </div>
                      `;
    productList.appendChild(listItem);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Load and display product data
  fetchData("../Data/products.json")
    .then((data) => {
      displayProducts(data.mocau_products); // Make sure to access the correct array
    })
    .catch((error) => {
      // console.error("Error loading product data:", error);
    });
});

function sortProducts() {
  const selectBox = document.getElementById("sort-select");
  const selectedValue = selectBox.options[selectBox.selectedIndex].value;

  fetchData("../Data/products.json")
    .then((data) => {
      if (selectedValue === "highToLow") {
        data.mocau_products.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      } else if (selectedValue === "lowToHigh") {
        data.mocau_products.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      }

      displayProducts(data.mocau_products);
    })
    .catch((error) => {
      console.error("Error sorting product data:", error);
    });
}