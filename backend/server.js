import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import db from "./config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// konfigurasi upload
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "uploads", "alat");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const projectUploadDir = path.join(__dirname, "uploads", "project");

if (!fs.existsSync(projectUploadDir)) {
  fs.mkdirSync(projectUploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = file.originalname
      .replace(ext, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    cb(null, `${Date.now()}-${safeName}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("File harus berupa gambar JPG, PNG, atau WEBP"));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

const projectStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, projectUploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = file.originalname
      .replace(ext, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    cb(null, `${Date.now()}-${safeName}${ext}`);
  },
});

const uploadProject = multer({
  storage: projectStorage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

app.use(cors());
app.use(express.json());

function requireAdmin(req, res, next) {
  const token = req.headers["x-admin-token"];

  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({
      message: "Akses admin ditolak",
    });
  }

  next();
}

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({
      message: "Password admin salah",
    });
  }

  res.json({
    message: "Login admin berhasil",
    token: process.env.ADMIN_TOKEN,
  });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

function parseSpesifikasi(value) {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

function resolveImageUrl(gambar) {
  if (!gambar) return "";

  if (gambar.startsWith("http://") || gambar.startsWith("https://")) {
    return gambar;
  }

  if (gambar.startsWith("/uploads")) {
    return `${process.env.BASE_URL || "http://localhost:5000"}${gambar}`;
  }

  return gambar;
}

function mapAlat(item) {
  return {
    id: item.id,
    nama: item.nama,
    slug: item.slug,
    gambar: resolveImageUrl(item.gambar),
    totalUnit: item.total_unit,
    tersedia: item.tersedia,
    dipinjam: item.dipinjam,
    maintenance: item.maintenance,
    spesifikasi: parseSpesifikasi(item.spesifikasi),
  };
}

function mapProject(item) {
  return {
    id: item.id,
    jenis: item.jenis,
    judul: item.judul,
    gambar: resolveImageUrl(item.gambar),
    deskripsiSingkat: item.deskripsi_singkat,
    deskripsiLengkap: item.deskripsi_lengkap,
  };
}

function slugify(text = "") {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

app.get("/", (req, res) => {
  res.send("Backend nyoba_web aktif");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend berjalan dengan baik",
  });
});

app.get("/api/db-test", async (req, res) => {
    app.get("/api/test", (req, res) => {
  res.json({
    message: "Route test berhasil",
  });
});
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS hasil");

    res.json({
      message: "Database terkoneksi",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Database gagal terkoneksi",
      error: error.message,
    });
  }
});

// =======================
// API DATA ALAT
// =======================

app.get("/api/alat", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM alat ORDER BY nama ASC");

    res.json(rows.map(mapAlat));
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data alat",
      error: error.message,
    });
  }
});

app.get("/api/alat/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const [rows] = await db.query("SELECT * FROM alat WHERE slug = ?", [slug]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Alat tidak ditemukan",
      });
    }

    res.json(mapAlat(rows[0]));
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil detail alat",
      error: error.message,
    });
  }
});

// =======================
// API PEMINJAMAN ALAT
// =======================

app.get("/api/peminjaman-alat", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        peminjaman_alat.*,
        alat.nama AS nama_alat
      FROM peminjaman_alat
      JOIN alat ON peminjaman_alat.alat_id = alat.id
      ORDER BY peminjaman_alat.created_at DESC
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data peminjaman alat",
      error: error.message,
    });
  }
});

app.post("/api/peminjaman-alat", async (req, res) => {
  try {
    const {
      alat_id,
      nama_peminjam,
      identitas,
      kontak,
      jumlah,
      tanggal_pinjam,
      tanggal_kembali,
      keperluan,
      catatan,
    } = req.body;

    if (
      !alat_id ||
      !nama_peminjam ||
      !identitas ||
      !kontak ||
      !jumlah ||
      !tanggal_pinjam ||
      !tanggal_kembali ||
      !keperluan
    ) {
      return res.status(400).json({
        message: "Data pengajuan peminjaman alat belum lengkap",
      });
    }

    if (new Date(tanggal_kembali) < new Date(tanggal_pinjam)) {
      return res.status(400).json({
        message: "Tanggal kembali tidak boleh sebelum tanggal pinjam",
      });
    }

    const [alatRows] = await db.query("SELECT * FROM alat WHERE id = ?", [
      alat_id,
    ]);

    if (alatRows.length === 0) {
      return res.status(404).json({
        message: "Alat tidak ditemukan",
      });
    }

    const alat = alatRows[0];

    if (Number(jumlah) < 1 || Number(jumlah) > Number(alat.tersedia)) {
      return res.status(400).json({
        message: "Jumlah peminjaman melebihi stok tersedia",
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO peminjaman_alat
      (
        alat_id,
        nama_peminjam,
        identitas,
        kontak,
        jumlah,
        tanggal_pinjam,
        tanggal_kembali,
        keperluan,
        catatan,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
      `,
      [
        alat_id,
        nama_peminjam,
        identitas,
        kontak,
        Number(jumlah),
        tanggal_pinjam,
        tanggal_kembali,
        keperluan,
        catatan || "",
      ]
    );

    res.status(201).json({
      message: "Pengajuan peminjaman alat berhasil dikirim",
      data: {
        id: result.insertId,
        status: "pending",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal membuat pengajuan peminjaman alat",
      error: error.message,
    });
  }
});

app.post("/api/peminjaman-alat", async (req, res) => {
  try {
    const {
      alat_id,
      nama_peminjam,
      identitas,
      kontak,
      jumlah,
      tanggal_pinjam,
      tanggal_kembali,
      keperluan,
      catatan,
    } = req.body;

    if (
      !alat_id ||
      !nama_peminjam ||
      !identitas ||
      !kontak ||
      !jumlah ||
      !tanggal_pinjam ||
      !tanggal_kembali ||
      !keperluan
    ) {
      return res.status(400).json({
        message: "Data pengajuan peminjaman alat belum lengkap",
      });
    }

    if (new Date(tanggal_kembali) < new Date(tanggal_pinjam)) {
      return res.status(400).json({
        message: "Tanggal kembali tidak boleh sebelum tanggal pinjam",
      });
    }

    const [alatRows] = await db.query("SELECT * FROM alat WHERE id = ?", [
      alat_id,
    ]);

    if (alatRows.length === 0) {
      return res.status(404).json({
        message: "Alat tidak ditemukan",
      });
    }

    const alat = alatRows[0];

    if (Number(jumlah) < 1 || Number(jumlah) > Number(alat.tersedia)) {
      return res.status(400).json({
        message: "Jumlah peminjaman melebihi stok tersedia",
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO peminjaman_alat
      (
        alat_id,
        nama_peminjam,
        identitas,
        kontak,
        jumlah,
        tanggal_pinjam,
        tanggal_kembali,
        keperluan,
        catatan,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
      `,
      [
        alat_id,
        nama_peminjam,
        identitas,
        kontak,
        Number(jumlah),
        tanggal_pinjam,
        tanggal_kembali,
        keperluan,
        catatan || "",
      ]
    );

    res.status(201).json({
      message: "Pengajuan peminjaman alat berhasil dikirim",
      data: {
        id: result.insertId,
        status: "pending",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal membuat pengajuan peminjaman alat",
      error: error.message,
    });
  }
});

app.post("/api/alat", requireAdmin, upload.single("gambar"), async (req, res) => {
  try {
    const {
      nama,
      totalUnit = 0,
      tersedia = 0,
      dipinjam = 0,
      maintenance = 0,
      spesifikasi = "[]",
    } = req.body;

    if (!nama) {
      return res.status(400).json({
        message: "Nama alat wajib diisi",
      });
    }

    const slug = slugify(nama);

    let spesifikasiArray = [];

    if (typeof spesifikasi === "string") {
      try {
        spesifikasiArray = JSON.parse(spesifikasi);
      } catch {
        spesifikasiArray = spesifikasi
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    }

    const gambarPath = req.file ? `/uploads/alat/${req.file.filename}` : "";

    const [result] = await db.query(
      `
      INSERT INTO alat
      (
        nama,
        slug,
        gambar,
        total_unit,
        tersedia,
        dipinjam,
        maintenance,
        spesifikasi
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        nama,
        slug,
        gambarPath,
        Number(totalUnit),
        Number(tersedia),
        Number(dipinjam),
        Number(maintenance),
        JSON.stringify(spesifikasiArray),
      ]
    );

    res.status(201).json({
      message: "Alat berhasil ditambahkan",
      data: {
        id: result.insertId,
        slug,
        gambar: resolveImageUrl(gambarPath),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan alat",
      error: error.message,
    });
  }
});

app.put("/api/alat/:id", requireAdmin, upload.single("gambar"), async (req, res) => {
  try {
    const { id } = req.params;

    const [currentRows] = await db.query("SELECT * FROM alat WHERE id = ?", [
      id,
    ]);

    if (currentRows.length === 0) {
      return res.status(404).json({
        message: "Alat tidak ditemukan",
      });
    }

    const current = currentRows[0];

    const {
      nama = current.nama,
      totalUnit = current.total_unit,
      tersedia = current.tersedia,
      dipinjam = current.dipinjam,
      maintenance = current.maintenance,
      spesifikasi,
    } = req.body;

    let spesifikasiArray = parseSpesifikasi(current.spesifikasi);

    if (spesifikasi) {
      try {
        spesifikasiArray = JSON.parse(spesifikasi);
      } catch {
        spesifikasiArray = spesifikasi
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    }

    const gambarPath = req.file
      ? `/uploads/alat/${req.file.filename}`
      : current.gambar;

    await db.query(
      `
      UPDATE alat SET
        nama = ?,
        slug = ?,
        gambar = ?,
        total_unit = ?,
        tersedia = ?,
        dipinjam = ?,
        maintenance = ?,
        spesifikasi = ?
      WHERE id = ?
      `,
      [
        nama,
        slugify(nama),
        gambarPath,
        Number(totalUnit),
        Number(tersedia),
        Number(dipinjam),
        Number(maintenance),
        JSON.stringify(spesifikasiArray),
        id,
      ]
    );

    res.json({
      message: "Alat berhasil diperbarui",
      data: {
        id,
        gambar: resolveImageUrl(gambarPath),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal memperbarui alat",
      error: error.message,
    });
  }
});

app.delete("/api/alat/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query("SELECT * FROM alat WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Alat tidak ditemukan",
      });
    }

    const alat = rows[0];

    await db.query("DELETE FROM alat WHERE id = ?", [id]);

    if (alat.gambar && alat.gambar.startsWith("/uploads")) {
      const filePath = path.join(__dirname, alat.gambar);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({
      message: "Alat berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus alat",
      error: error.message,
    });
  }
});

app.put("/api/peminjaman-alat/:id/status", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "pending",
      "disetujui",
      "ditolak",
      "dipinjam",
      "dikembalikan",
      "dibatalkan",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Status tidak valid",
      });
    }

    const [peminjamanRows] = await db.query(
      "SELECT * FROM peminjaman_alat WHERE id = ?",
      [id]
    );

    if (peminjamanRows.length === 0) {
      return res.status(404).json({
        message: "Data peminjaman tidak ditemukan",
      });
    }

    const peminjaman = peminjamanRows[0];
    const statusLama = peminjaman.status;
    const jumlah = Number(peminjaman.jumlah);

    const [alatRows] = await db.query("SELECT * FROM alat WHERE id = ?", [
      peminjaman.alat_id,
    ]);

    if (alatRows.length === 0) {
      return res.status(404).json({
        message: "Data alat tidak ditemukan",
      });
    }

    const alat = alatRows[0];

    const statusAktif = ["disetujui", "dipinjam"];
    const statusLamaAktif = statusAktif.includes(statusLama);
    const statusBaruAktif = statusAktif.includes(status);

    if (!statusLamaAktif && statusBaruAktif) {
      if (Number(alat.tersedia) < jumlah) {
        return res.status(400).json({
          message: "Stok alat tidak mencukupi",
        });
      }

      await db.query(
        `
        UPDATE alat SET
          tersedia = tersedia - ?,
          dipinjam = dipinjam + ?
        WHERE id = ?
        `,
        [jumlah, jumlah, peminjaman.alat_id]
      );
    }

    if (statusLamaAktif && !statusBaruAktif) {
      await db.query(
        `
        UPDATE alat SET
          tersedia = tersedia + ?,
          dipinjam = dipinjam - ?
        WHERE id = ?
        `,
        [jumlah, jumlah, peminjaman.alat_id]
      );
    }

    await db.query("UPDATE peminjaman_alat SET status = ? WHERE id = ?", [
      status,
      id,
    ]);

    res.json({
      message: "Status peminjaman berhasil diperbarui",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal memperbarui status peminjaman",
      error: error.message,
    });
  }
});

// =======================
// API PROJECT
// =======================

app.get("/api/project", async (req, res) => {
  try {
    const { jenis } = req.query;

    let query = "SELECT * FROM project WHERE is_deleted = 0";
    const params = [];

    if (jenis) {
      query += " AND jenis = ?";
      params.push(jenis);
    }

    query += " ORDER BY created_at DESC";

    const [rows] = await db.query(query, params);

    res.json(rows.map(mapProject));
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data project",
      error: error.message,
    });
  }
});

app.get("/api/project/:jenis/:id", async (req, res) => {
  try {
    const { jenis, id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM project WHERE jenis = ? AND id = ? AND is_deleted = 0",
      [jenis, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Project tidak ditemukan",
      });
    }

    res.json(mapProject(rows[0]));
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil detail project",
      error: error.message,
    });
  }
});

app.post("/api/project", requireAdmin, uploadProject.single("gambar"), async (req, res) => {
  try {
    const {
      jenis,
      judul,
      deskripsiSingkat = "",
      deskripsiLengkap = "",
    } = req.body;

    if (!jenis || !judul) {
      return res.status(400).json({
        message: "Jenis dan judul project wajib diisi",
      });
    }

    if (!["penelitian", "pengabdian"].includes(jenis)) {
      return res.status(400).json({
        message: "Jenis project tidak valid",
      });
    }

    const gambarPath = req.file ? `/uploads/project/${req.file.filename}` : "";

    const [result] = await db.query(
      `
      INSERT INTO project
      (
        jenis,
        judul,
        gambar,
        deskripsi_singkat,
        deskripsi_lengkap
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [jenis, judul, gambarPath, deskripsiSingkat, deskripsiLengkap]
    );

    res.status(201).json({
      message: "Project berhasil ditambahkan",
      data: {
        id: result.insertId,
        gambar: resolveImageUrl(gambarPath),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan project",
      error: error.message,
    });
  }
});

app.put("/api/project/:id", requireAdmin, uploadProject.single("gambar"), async (req, res) => {
  try {
    const { id } = req.params;

    const [currentRows] = await db.query(
      "SELECT * FROM project WHERE id = ?",
      [id]
    );

    if (currentRows.length === 0) {
      return res.status(404).json({
        message: "Project tidak ditemukan",
      });
    }

    const current = currentRows[0];

    const {
      jenis = current.jenis,
      judul = current.judul,
      deskripsiSingkat = current.deskripsi_singkat,
      deskripsiLengkap = current.deskripsi_lengkap,
    } = req.body;

    if (!["penelitian", "pengabdian"].includes(jenis)) {
      return res.status(400).json({
        message: "Jenis project tidak valid",
      });
    }

    const gambarPath = req.file
      ? `/uploads/project/${req.file.filename}`
      : current.gambar;

    await db.query(
      `
      UPDATE project SET
        jenis = ?,
        judul = ?,
        gambar = ?,
        deskripsi_singkat = ?,
        deskripsi_lengkap = ?
      WHERE id = ?
      `,
      [jenis, judul, gambarPath, deskripsiSingkat, deskripsiLengkap, id]
    );

    res.json({
      message: "Project berhasil diperbarui",
      data: {
        id,
        gambar: resolveImageUrl(gambarPath),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal memperbarui project",
      error: error.message,
    });
  }
});

app.delete("/api/project/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query("SELECT * FROM project WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Project tidak ditemukan",
      });
    }

    await db.query("UPDATE project SET is_deleted = 1 WHERE id = ?", [id]);

    res.json({
      message: "Project berhasil dihapus dari tampilan",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus project",
      error: error.message,
    });
  }
});

// =======================
// API RUANGAN
// =======================

app.get("/api/ruangan", async (req, res) => {
  try {
    const [rows] = await db.query(
  "SELECT * FROM ruangan WHERE is_deleted = 0 ORDER BY nama ASC"
);

    const data = rows.map((item) => ({
      id: item.id,
      nama: item.nama,
      slug: item.slug,
      fungsi: item.fungsi,
      jamOperasional: item.jam_operasional,
      status: item.status,
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data ruangan",
      error: error.message,
    });
  }
});

app.post("/api/ruangan", requireAdmin, async (req, res) => {
  try {
    const {
      nama,
      fungsi = "",
      jamOperasional = "",
      status = "tersedia",
    } = req.body;

    if (!nama) {
      return res.status(400).json({
        message: "Nama ruangan wajib diisi",
      });
    }

    const slug = slugify(nama);

    const [result] = await db.query(
      `
      INSERT INTO ruangan
      (
        nama,
        slug,
        fungsi,
        jam_operasional,
        status
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [nama, slug, fungsi, jamOperasional, status]
    );

    res.status(201).json({
      message: "Ruangan berhasil ditambahkan",
      data: {
        id: result.insertId,
        slug,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan ruangan",
      error: error.message,
    });
  }
});

app.put("/api/ruangan/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const [currentRows] = await db.query(
      "SELECT * FROM ruangan WHERE id = ?",
      [id]
    );

    if (currentRows.length === 0) {
      return res.status(404).json({
        message: "Ruangan tidak ditemukan",
      });
    }

    const current = currentRows[0];

    const {
      nama = current.nama,
      fungsi = current.fungsi,
      jamOperasional = current.jam_operasional,
      status = current.status,
    } = req.body;

    await db.query(
      `
      UPDATE ruangan SET
        nama = ?,
        slug = ?,
        fungsi = ?,
        jam_operasional = ?,
        status = ?
      WHERE id = ?
      `,
      [nama, slugify(nama), fungsi, jamOperasional, status, id]
    );

    res.json({
      message: "Ruangan berhasil diperbarui",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal memperbarui ruangan",
      error: error.message,
    });
  }
});

app.delete("/api/ruangan/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query("SELECT * FROM ruangan WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Ruangan tidak ditemukan",
      });
    }

    await db.query("UPDATE ruangan SET is_deleted = 1 WHERE id = ?", [id]);

    res.json({
      message: "Ruangan berhasil dihapus dari tampilan",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus ruangan",
      error: error.message,
    });
  }
});

// =======================
// API PEMINJAMAN RUANGAN
// =======================

app.get("/api/peminjaman-ruangan", async (req, res) => {
  try {
    const { tanggal } = req.query;

    let query = `
      SELECT 
        peminjaman_ruangan.*,
        ruangan.nama AS nama_ruangan
      FROM peminjaman_ruangan
      JOIN ruangan ON peminjaman_ruangan.ruangan_id = ruangan.id
    `;

    const params = [];

    if (tanggal) {
      query += " WHERE peminjaman_ruangan.tanggal = ?";
      params.push(tanggal);
    }

    query += " ORDER BY peminjaman_ruangan.tanggal ASC, peminjaman_ruangan.jam_mulai ASC";

    const [rows] = await db.query(query, params);

    const data = rows.map((item) => ({
      id: item.id,
      ruanganId: item.ruangan_id,
      namaRuangan: item.nama_ruangan,
      namaPeminjam: item.nama_peminjam,
      identitas: item.identitas,
      tanggal: item.tanggal,
      jamMulai: String(item.jam_mulai).slice(0, 5),
      jamSelesai: String(item.jam_selesai).slice(0, 5),
      keperluan: item.keperluan,
      status: item.status,
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data peminjaman ruangan",
      error: error.message,
    });
  }
});

app.post("/api/peminjaman-ruangan", async (req, res) => {
  try {
    const {
      ruangan_id,
      nama_peminjam,
      identitas,
      tanggal,
      jam_mulai,
      jam_selesai,
      keperluan,
    } = req.body;

    if (
      !ruangan_id ||
      !nama_peminjam ||
      !identitas ||
      !tanggal ||
      !jam_mulai ||
      !jam_selesai ||
      !keperluan
    ) {
      return res.status(400).json({
        message: "Data pengajuan ruangan belum lengkap",
      });
    }

    if (jam_selesai <= jam_mulai) {
      return res.status(400).json({
        message: "Jam selesai harus lebih besar dari jam mulai",
      });
    }

    const [bentrokRows] = await db.query(
      `
      SELECT * FROM peminjaman_ruangan
      WHERE ruangan_id = ?
      AND tanggal = ?
      AND status IN ('pending', 'disetujui')
      AND jam_mulai < ?
      AND jam_selesai > ?
      `,
      [ruangan_id, tanggal, jam_selesai, jam_mulai]
    );

    if (bentrokRows.length > 0) {
      return res.status(400).json({
        message: "Jam yang dipilih bentrok dengan jadwal yang sudah ada",
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO peminjaman_ruangan
      (
        ruangan_id,
        nama_peminjam,
        identitas,
        tanggal,
        jam_mulai,
        jam_selesai,
        keperluan,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
      `,
      [
        ruangan_id,
        nama_peminjam,
        identitas,
        tanggal,
        jam_mulai,
        jam_selesai,
        keperluan,
      ]
    );

    res.status(201).json({
      message: "Pengajuan peminjaman ruangan berhasil dikirim",
      data: {
        id: result.insertId,
        status: "pending",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal membuat pengajuan peminjaman ruangan",
      error: error.message,
    });
  }
});

app.put("/api/peminjaman-ruangan/:id/status", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = ["pending", "disetujui", "ditolak", "dibatalkan"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Status tidak valid",
      });
    }

    const [rows] = await db.query(
      "SELECT * FROM peminjaman_ruangan WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Data peminjaman ruangan tidak ditemukan",
      });
    }

    await db.query("UPDATE peminjaman_ruangan SET status = ? WHERE id = ?", [
      status,
      id,
    ]);

    res.json({
      message: "Status peminjaman ruangan berhasil diperbarui",
    });
  } catch (error) {
    console.error("ERROR UPDATE STATUS RUANGAN:", error);

    res.status(500).json({
      message: "Gagal memperbarui status peminjaman ruangan",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend berjalan di http://localhost:${PORT}`);
});