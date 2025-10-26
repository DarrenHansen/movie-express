import movieModel from "../models/movieModel.js";

const formatValidationMessages = (error) => {
  if (!error || !error.errors) return error.message || String(error);
  return Object.values(error.errors).map((e) => e.message).join(", ");
};

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
    const { judul, tahunRilis, sutradara } = req.body;

    if (!judul || !tahunRilis || !sutradara) {
      return res.status(400).json({
        message: "Field 'judul', 'tahunRilis', dan 'sutradara' wajib diisi.",
        data: null,
      });
    }

    const newMovie = await movieModel.create({ judul, tahunRilis, sutradara });

    res.status(201).json({
      message: "Movie berhasil ditambahkan",
      data: newMovie,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: `Movies validation failed: ${formatValidationMessages(error)}`,
        data: null,
      });
    }

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

    if (!request || Object.keys(request).length === 0) {
      return res.status(400).json({
        message: "Request body kosong. Sertakan minimal satu field yang ingin diupdate.",
        data: null,
      });
    }

    const response = await movieModel.findByIdAndUpdate(id, request, { new: true, runValidators: true });

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
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: `Movies validation failed: ${formatValidationMessages(error)}`,
        data: null,
      });
    }

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
