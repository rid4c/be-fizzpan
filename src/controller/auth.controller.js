import { supabase } from "../utils/supabase/client.js";

export default {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async AuthLogin(req, res) {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        status: false,
        pesan: error.message || "Terjadi kesalahan",
      });
    }

    const { access_token, refresh_token } = data.session;

    res.cookie("jwt", access_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.cookie("jwt_refresh", refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return res.status(201).json({
      status: true,
      pesan: "Berhasil Login",
      data: data,
    });
  },
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async AuthRegister(req, res) {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        status: false,
        pesan: error.message || "Terjadi kesalahan",
      });
    }

    return res.status(201).json({
      status: true,
      pesan: "Berhasil Login",
      data: data,
    });
  },
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async AuthLogout(req, res) {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(401).json({
        status: false,
        pesan: error.message || "Terjadi Kesalahan",
      });
    }

    res.cookie("jwt", "", { maxAge: 0 });
    res.cookie("jwt_refresh", "", { maxAge: 0 });

    return res.status(200).json({
      status: true,
      pesan: "Berhasil Keluar",
    });
  },

  async AuthMe(req, res) {
    try {
      return res.status(200).json({
        status: true,
        pesan: "Berhasil Mengambil Data User",
        user: req.user,
      });
    } catch (error) {
      console.error("Error Mengambil Data User:", error.message);
      return res.status(500).json({
        status: false,
        pesan: "Internal Server Error",
      });
    }
  },
};
