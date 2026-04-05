import express from "express";
const router = express.Router();


const hospitalDetails = {
  Delhi: [
    {
      name: "Fauget Heart Institute,Defence Colony,New Delhi",
      image: "https://via.placeholder.com/1200x400",
      beds: 260,
      icu: 80,
      rating: 4.7,
      description: "Advanced cardiac hospital in Delhi."
    },
    {
      name: "Fauget Medical Centre,Chirag Enclave,New Delhi",
      image: "https://via.placeholder.com/1200x400",
      beds: 150,
      icu: 40,
      rating: 4.5,
      description: "Specialized diabetes care center."
    },
     {
      name: "Fauget La Femme,Shalimar Bagh,New Delhi",
      image: "https://via.placeholder.com/1200x400",
      beds: 260,
      icu: 80,
      rating: 4.7,
      description: "Advanced gynaec hospital in Delhi."
    },
  ],

  Punjab: [
    {
      name: "Fauget Medical Centre, Mohali",
      image: "https://via.placeholder.com/1200x400",
      beds: 300,
      icu: 90,
      rating: 4.6,
      description: "Multi-speciality hospital."
    },
      {
      name: "Fauget Hospital Mall Road, Ludhiana",
      image: "https://via.placeholder.com/1200x400",
      beds: 300,
      icu: 90,
      rating: 4.6,
      description: "Multi-speciality hospital."
    },
      {
      name: "Fauget Medical Centre, Bathinda",
      image: "https://via.placeholder.com/1200x400",
      beds: 300,
      icu: 90,
      rating: 4.6,
      description: "Multi-speciality hospital."
    }
  ],
  Haryana: [
  {
    name: "Fauget Medical Centre, Gurgaon",
    image: "https://via.placeholder.com/1200x400",
    beds: 280,
    icu: 70,
    rating: 4.6,
    description: "Advanced multi-speciality hospital in Gurgaon."
  },
  {
    name: "Fauget Hospital, Faridabad",
    image: "https://via.placeholder.com/1200x400",
    beds: 220,
    icu: 60,
    rating: 4.5,
    description: "Trusted healthcare in Faridabad."
  },
  {
    name: "Fauget Medical Centre, Panipat",
    image: "https://via.placeholder.com/1200x400",
    beds: 180,
    icu: 50,
    rating: 4.4,
    description: "Affordable care with modern facilities."
  }
]



  
};

// ✅ GET ALL BY STATE (for dropdown)
// ✅ GET SINGLE HOSPITAL (FIRST 🔥)
router.get("/details/:name", (req, res) => {


  // ✅ DECODE NAME
 const name = decodeURIComponent(req.params.name);

  let found = null;

  Object.values(hospitalDetails).forEach((state) => {
    state.forEach((h) => {
      if (h.name === name) {
        found = h;
      }
    });
  });

  res.json(found || {});
});

// ✅ GET ALL BY STATE (SECOND)
router.get("/:state", (req, res) => {
  const data = hospitalDetails[req.params.state];
  res.json(data || []);
});

export default router;