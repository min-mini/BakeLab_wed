const productSection = document.querySelector(".product")
const searchBtn = document.querySelector('.search-btn')
const categorylist=document.querySelectorAll(".category>li");
searchBtn.onclick = get_sel_products;

function get_sel_products(){
    const searchTxt = document.querySelector('.search-txt').value;
    console.log(searchTxt)
    const filterParam = `search='${searchTxt}'`;
    get_all_products(filterParam)
}


console.log('하이')

get_all_products()

categorylist.forEach(categoryLi => {
    categoryLi.onclick = () => {
        get_all_products(`category=${categoryLi.className}`);
    }
} );

// 사용자 정보를 가져오는 함수
function getCurrentUser() {
    return fetch("/user/api")
        .then(response => response.json())
        .then(data => data.role)
        .catch(error => {
            console.error('An error occurred while fetching user data:', error);
            return null;
        });
}

// 상품 목록을 가져와 화면에 표시하는 함수
function get_all_products(filterParam) {
    fetch(`/product?${filterParam}`)
        .then(response => response.json())
        .then(object => {
            console.log(object);
            return getCurrentUser().then(userRole => {
                create_product(object, userRole);
            });
        })
        .catch(error => {
            console.error('An error occurred while fetching products:', error);
            // 또는 사용자에게 메시지 표시
        });
}

// 상품 목록을 화면에 생성하는 함수
function create_product(products, userRole) {
    productSection.innerHTML = '';
    for (const product of products) {
        const product_name = product.productVO.product_name;
        const price = product.productVO.price;
        const disPrice =  price * 0.90;
        const image = product.imagesVO[0].image;

        // 사용자 역할에 따라 링크 URL 생성
        const productLink = userRole === 'SELLER' ?
            `/product/update?product_name=${product_name}` :
            `/product/details?product_name=${product_name}`;

        productSection.insertAdjacentHTML("beforeend", `
            <ul class="product-list">
                <li class="baby-product">
                    <a href="${productLink}" style="height: 356px;" data-product-name="${product_name}">
                        <ul class="baby-product-wrap">
                            <li class="image">
                                <img src="/product/image/${image}" alt="이미지가 존재하지않습니다">
                            </li>
                            <li class="description">
                                <ul class="baby-product badges">
                                    <li class="badge delivery-info">무료배송</li>
                                </ul>
                                <li class="name">${product_name}</li>
                                <li>
                                    <ul class="price-area">
                                        <li class="price-wrap">
                                            <div class="price">
                                                <span class="price-info">
                                                    <span class="discount-percentage">10%</span>
                                                    <del class="base-price">${price}</del>
                                                </span>
                                                <em class="sale">
                                                    <strong class="price-value">${disPrice}</strong>원
                                                </em>
                                            </div>
                                            <div class="delivery">
                                                <span class="arrival-info emphasis">
                                                    <em style="color:#212B36">모레(목)</em>
                                                    <em style="color:#212B36">도착 예정</em>
                                                </span>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </a>
                    </li>
                </ul>
            `
        );
    }
}

