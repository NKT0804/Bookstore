// cấu hình clouddinary
cloudinary.config({
  cloud_name: "dawguh6la",
  api_key: "826926497597855",
  api_secret: "RToqJMfGC5tvL4R-jzFY7d3oUxU",
});

//upload image len cloud
cloudinary.v2.uploader.upload(
  "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" },
  function (error, result) {
    console.log(result);
  }
);

//Thay đổi kích thước,... của hình ảnh
cloudinary.image("sneaker.png", { crop: "scale", width: 150 });
