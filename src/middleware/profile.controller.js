import { supabase } from "../utils/supabase/client.js";
import { v4 as uuidv4 } from "uuid";

export default {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async createProfile(req, res) {
    const { username, role, avatar_url } = req.body;

    const { data, error } = await supabase
      .from("profiles")
      .insert({ id: uuidv4(), username, role, avatar_url })
      .select();

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }

    return res.status(201).json({
      status: true,
      message: "berhasil menambahkan profile",
      data: data,
    });
  },

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async getAllProfile(req, res) {
    const { data, error } = await supabase
      .from("profiles")
      .select("username, role, avatar_url");

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
    return res.status(201).json({
      status: true,
      message: "berhasil",
      data: data,
    });
  },
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async updateProfile(req, res) {
    const { id } = req.params;

    const { username, role, avatar_url } = req.body;

    const { data, error } = await supabase
      .from("profiles")
      .update({ username, role, avatar_url })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
    if (!data.length)
      return res.status(404).json({
        status: true,
        message: "Profile tidak tersedia",
        data: data,
      });
    return res.status(201).json({
      status: true,
      message: "Berhasil update profile",
      data: data,
    });
  },
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async deleteProfile(req, res) {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({
        status: true,
        message: error.message,
      });
    }
    if (!data.length)
      return res.status(401).json({
        status: true,
        message: "Profile tidak tersedia",
        data: data,
      });
    return res.status(200).json({
      status: true,
      message: "Berhasil mengahpus profile",
      data: data,
    });
  },
};
