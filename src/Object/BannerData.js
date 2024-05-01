import { v4 as uuid } from "uuid";

const BannerData = [
  {
    id: uuid(),
    title: "Graphic Design",
    bannerImage: "../images/gds.jpg",
    details: "Create stunning visuals for your brand with our professional graphic design services.",
  },
  {
    id: uuid(),
    title: "Web Development",
    bannerImage: "../images/webd.jpg",
    details: "Build a powerful online presence with our custom web development solutions tailored to your needs.",
  },
  {
    id: uuid(),
    title: "Content Writing",
    bannerImage: "../images/cdg.jfif",
    details: "Engage your audience with compelling content crafted by our skilled writers.",
  },
  {
    id: uuid(),
    title: "Digital Marketing",
    bannerImage: "../images/dgm.jfif",
    details: "Reach your target audience and drive growth with our comprehensive digital marketing strategies.",
  },
  {
    id: uuid(),
    title: "Video Production",
    bannerImage: "../images/vdp.jpg",
    details: "Tell your story through captivating videos produced by our talented team.",
  },
  {
    id: uuid(),
    title: "App Development",
    bannerImage: "../images/appd.jpg",
    details: "Bring your ideas to life with our expert app development services for iOS and Android platforms.",
  }
];

export default BannerData;
