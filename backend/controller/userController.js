





import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";



export const getDoctorsByDepartment = async (req, res) => {
  try {
    const { department } = req.params;

  const doctors = await User.find({
  role: "Doctor",
  doctorDepartment: { $regex: new RegExp(department, "i") },
});

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

export const getDoctorsByHospital = async (req, res) => {
  try {
    const { name } = req.params;

    const doctors = await User.find({
      role: "Doctor",
      hospital: { $regex: name, $options: "i" }, // 🔥 FIXED
    });

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching doctors",
    });
  }
};

export const patientRegister = async (req, res) => {
  try {
    const {
     
      firstName,
      lastName,
      email,
      phone,
      password,
      nic,
      dob,
      gender,
    } = req.body;

    // ✅ CHECK REQUIRED FIELDS
    if (
      !firstName || !lastName ||
      !email || !phone || !password ||
      !nic || !dob || !gender
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // ✅ CHECK IF USER ALREADY EXISTS
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // ✅ CREATE USER
    const user = await User.create({
     
      firstName,
      lastName,
      email,
      phone,
      password,
      nic,
       dob: new Date(dob),
      gender,
      role: "Patient",
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user,
    });

  } catch (error) {
  console.log("FULL ERROR:", error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};
/* ================= LOGIN (EMAIL OR PHONE) ================= */
export const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    if ((!email && !phone) || !password) {
      return res.status(400).json({
        success: false,
        message: "Provide Email/Phone and Password",
      });
    }

    const user = await User.findOne({
      $or: [{ email }, { phone }],
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found. Please register first!",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = user.generateJsonWebToken();

    res.status(200).json({
      success: true,
      token,
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

/* ================= SEND OTP ================= */
export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone required",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    console.log("OTP:", otp);

    res.status(200).json({
      success: true,
      otp,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "OTP failed",
    });
  }
};
/* ================= VERIFY OTP ================= */
export const verifyOtp = catchAsyncErrors(async (req, res, next) => {
  const { phone, email, otp } = req.body;

  if ((!phone && !email) || !otp) {
    return next(new ErrorHandler("Phone/Email and OTP required", 400));
  }

  let user;

  if (phone) {
    user = await User.findOne({ phone });
  } else {
    user = await User.findOne({ email });
  }

  if (!user || user.otp !== otp) {
    return next(new ErrorHandler("Invalid OTP", 400));
  }

  // ✅ clear OTP
  user.otp = null;
  await user.save();

  generateToken(user, "Login Successfully!", 200, res);
});

/* ================= ADMIN ================= */
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin already exists!", 400));
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });

  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});

/* ================= DOCTOR ================= */
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }

  const { docAvatar } = req.files;

  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Doctor already exists!", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    doctor,
  });
});

/* ================= OTHERS ================= */
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({ success: true, doctors });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ success: true, user: req.user });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res.status(200).cookie("adminToken", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "Lax",
  }).json({ success: true, message: "Admin Logged Out" });
});

export const logoutPatient = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};


export const getAllHospitals = async (req, res) => {
  try {
    const { state } = req.query;

    let filter = { role: "Doctor" };

    // ✅ Apply state filter if provided
    if (state) {
      filter.state = { $regex: new RegExp(state, "i") };
    }

    const hospitals = await User.distinct("hospital", filter);

    res.status(200).json({
      success: true,
      hospitals,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching hospitals",
    });
  }
};

  