import movieModel from "../models/movieModel.js";

export const listMovie = async (req, res) => {
  try {
    const data = await movieModel.find({});

    res.status(200).json({
      message: "Berhasil mendapatkan list movie",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

export const addListMovie = async (req, res) => {
  try {
    const newMovie = await movieModel.create(req.body);

    res.status(201).json({
      message: "Movie berhasil ditambahkan",
      data: newMovie,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

export const updateDataMovie = async (req, res) => {
  try {
    const id = req.params?.id;
    const request = req.body;

    if (!id) {
      return res.status(400).json({
        message: "ID Movie wajib diisi",
        data: null,
      });
    }

    const response = await movieModel.findByIdAndUpdate(id, request, { new: true });

    if (!response) {
      return res.status(404).json({
        message: "Data movie tidak ditemukan",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Data movie berhasil diupdate",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        message: "ID Movie wajib diisi",
        data: null,
      });
    }

    const response = await movieModel.findByIdAndDelete(id);

    if (!response) {
      return res.status(404).json({
        message: "Movie tidak ditemukan",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Movie berhasil dihapus",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};
