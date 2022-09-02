class Helper {
  static async sendImage(img) {
    try {
      const result = await axios.post(
        '/api/v1/uploads',
        { image: img },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return {
        msg: result.data.msg,
        status: result.status,
        name: result.data.imageName,
      };
    } catch (err) {
      console.log(err);
    }
  }

  static async sendInfo(info) {
    try {
      const result = await axios.post('/api/v1/create', { product: info });

      return {
        status: result.status,
        msg: result.data.msg,
      };
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllProducts() {
    try {
      const result = await axios.get('/api/v1');

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async getSingleProduct(id) {
    try {
      const result = await axios.get(`/api/v1/${id}`);

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteItem(id) {
    try {
      const result = await axios.delete(`/api/v1/delete/${id}`);

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async editItem({ id, data }) {
    try {
      const result = await axios.patch(`/api/v1/edit/${id}`, { edit: data });

      return {
        status: result.status,
        msg: result.data.msg,
      };
    } catch (err) {
      console.log(err);
    }
  }
}

export default Helper;
