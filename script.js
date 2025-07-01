document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const toggleBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

toggleBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

const faders = document.querySelectorAll(".fade-in");
const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -80px 0px",
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

// document
//   .getElementById("contact-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     const formMessage = document.getElementById("form-message");
//     formMessage.classList.remove("hidden", "text-red-500");
//     formMessage.classList.add("text-green-500");
//     formMessage.textContent =
//       "Thank you for your message! I will get back to you soon.";
//     formMessage.style.display = "block";

//     setTimeout(() => {
//       this.reset();
//       formMessage.style.display = "none";
//     }, 3000);
//   });

window.onload = function () {
  const canvas = document.getElementById("three-canvas");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const ambientLight = new THREE.AmbientLight(0x404040, 2.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(0, 1, 1).normalize();
  scene.add(directionalLight);

  const geometry = new THREE.IcosahedronGeometry(1.2, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x007bff,
    emissive: 0x003060,
    specular: 0x00aaff,
    shininess: 120,
    flatShading: true,
  });
  const icosahedron = new THREE.Mesh(geometry, material);
  scene.add(icosahedron);

  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 700;
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 12;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.015,
    color: 0x87ceeb,
    transparent: true,
    opacity: 0.7,
  });

  const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particleMesh);

  camera.position.z = 3;

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  });

  document.addEventListener("touchmove", (event) => {
    if (event.touches.length > 0) {
      mouseX = event.touches[0].clientX - windowHalfX;
      mouseY = event.touches[0].clientY - windowHalfY;
    }
  });

  const animate = () => {
    requestAnimationFrame(animate);

    targetX = mouseX * 0.0008;
    targetY = mouseY * 0.0008;

    icosahedron.rotation.y += 0.04 * (targetX - icosahedron.rotation.y);
    icosahedron.rotation.x += 0.04 * (targetY - icosahedron.rotation.x);

    particleMesh.rotation.y += 0.0004;
    particleMesh.rotation.x += 0.00015;

    renderer.render(scene, camera);
  };

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};
