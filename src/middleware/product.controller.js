import { supabase } from "../utils/supabase/client.js";

export default {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async createProduct(req, res) {
    const { name, description, price, stock, image } = req.body;

    const { data, error } = await supabase
      .from("products")
      .insert({ name, description, price, stock, image })
      .select();

    if (error) {
      return res.status(400).json({
        status: true,
        message: error.message,
      });
    }

    return res.status(201).json({
      status: true,
      message: "berhasil membuat data",
      data: data,
    });
  },

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getAllProduk(req, res) {
    const { data, error } = await supabase.from("products").select();

    if (error) {
      return res.status(400).json({
        status: true,
        message: error.message,
      });
    }

    return res.status(200).json({
      status: true,
      message: "berhasil",
      data: data,
    });
  },

  async updateProduct(req, res) {
    const { id } = req.params;
    const { name, description, price, stock, image } = req.body;

    const { data, error } = await supabase
      .from("products")
      .update({ name, description, price, stock, image })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }

    if (!data.length) {
      return res.status(404).json({
        status: false,
        message: "Produk tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Berhasil update data",
      data: data,
    });
  },

  async deleteProduct(req, res) {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }

    if (!data.length) {
      return res.status(404).json({
        status: false,
        message: "Produk tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Berhasil menghapus produk",
      data: data,
    });
  },
  
};
