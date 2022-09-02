import Helper from './Helper.js';

class UI {
  constructor() {
    this.formEl = document.querySelector('form');
    this.msgContainer = document.querySelector('.msg-show');
    this.allInputs = document.querySelectorAll('input');
    this.cardContainer = document.querySelector('.container');
    this.nameInput = document.getElementById('name');
    this.priceInput = document.getElementById('price');
    this.imageInput = document.getElementById('image');

    this.events();
  }

  events() {
    this.cardContainer.addEventListener('click', this.editDelete.bind(this));

    this.formEl.addEventListener('submit', this.formHandle.bind(this));
  }

  async editDelete(e) {
    const { target } = e;
    const clickedDel = target.closest('.del');
    const clickedEdit = target.closest('.edit');

    if (clickedDel || clickedEdit) {
      const dataID = e.target.getAttribute('data-id');

      if (clickedDel) {
        const { data } = await Helper.deleteItem(dataID);
        this.showMsg(data.msg, 'text-danger');

        this.display(data.products);
      }

      if (clickedEdit) {
        const singleProduct = await Helper.getSingleProduct(dataID);

        this.formEl.setAttribute('data-id', `${dataID}`);

        this.singleShow(singleProduct.data.product);
      }
    }
  }

  async formHandle(e) {
    e.preventDefault();
    const nameValue = this.nameInput.value.trim();
    const priceValue = this.priceInput.value.trim();
    const imageValue = this.imageInput.files[0];
    const dataId = e.target.getAttribute('data-id');

    if (dataId === '') {
      if (!nameValue || !priceValue || !imageValue)
        return this.showMsg('Pls fill all input fields', 'text-danger');

      if (!this.imgValidation(imageValue)) return;

      //image file upload
      const imagUploadResult = await Helper.sendImage(imageValue);

      if (imagUploadResult.status === 200) {
        const imageName = imagUploadResult.name;
        const productCreateResult = await Helper.sendInfo({
          name: nameValue,
          price: priceValue,
          image: imageName,
        });

        if (productCreateResult.status === 200) {
          this.showMsg(productCreateResult.msg, 'text-success');
          this.clearInputs();
          const data = await Helper.getAllProducts();
          this.display(data.data.products);
        } else {
          this.showMsg('Server problem, Pls try later', 'text-danger');
        }
      }

      if (imagUploadResult.status !== 200)
        this.showMsg(imagUploadResult.msg, 'text-danger');
    }

    if (dataId) {
      const editInfo = {};

      if (nameValue) {
        editInfo.name = nameValue;
      }
      if (priceValue) {
        editInfo.price = priceValue;
      }
      if (imageValue) {
        if (!this.imgValidation(imageValue))
          return this.showMsg('Pls upload valid image', 'text-danger');

        //image file upload
        const imagUploadResult = await Helper.sendImage(imageValue);

        if (imagUploadResult.status === 200) {
          const imageName = imagUploadResult.name;
          editInfo.image = imageName;
        }
      }

      const productEditResult = await Helper.editItem({
        id: dataId,
        data: editInfo,
      });

      if (productEditResult.status === 200) {
        this.showMsg(productEditResult.msg, 'text-success');
        this.clearInputs();
        const data = await Helper.getAllProducts();
        this.display(data.data.products);
      } else {
        this.showMsg('Server problem, Pls try later', 'text-danger');
      }
    }
  }

  singleShow(product) {
    document.getElementById('name').value = product.name;
    document.getElementById('price').value = product.price;
  }

  showMsg(msg, className) {
    this.msgContainer.textContent = msg;
    this.msgContainer.classList.add(className);

    this.hideMsg();
  }

  hideMsg() {
    setTimeout(() => {
      this.msgContainer.textContent = 'show message here.............';
      this.msgContainer.className = 'msg-show';
    }, 2000);
  }

  imgValidation(img) {
    const type = img.type.split('/')[0];
    const { size } = img;

    if (type !== 'image') {
      this.showMsg('Only image are supported', 'text-danger');

      return false;
    }

    if (size > 2000000) {
      this.showMsg('Image must be in 2mb', 'text-danger');

      return false;
    }

    return true;
  }

  clearInputs() {
    this.allInputs.forEach((input) => (input.value = ''));
  }

  display(data) {
    this.cardContainer.innerHTML = '';

    data.forEach((item) => {
      this.cardContainer.innerHTML += `
			<div class="card">
					<p class="change">
						<button data-id="${item._id}" title="edit ?" class="edit">✏️</button>
						<button data-id="${item._id}" class="del" title="delete ?">🚮</button>
					</p>
					<img src="./uploads/${item.image}" alt="image" />
					<footer>
						<p>${item.name}</p>
						<span>${item.price}</span>
					</footer>
      </div>
			`;
    });
  }
}

export default UI;
