
document.getElementById("header").innerHTML = `
  <nav class="navbar navbar-expand-lg cs-bg-black">
    <div class="container-fluid">
      <a class="navbar-brand" href="index.html"><h1>PC <span>Harbour</span></h1></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" 
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link" href="index.html">Home</a>
          <a class="nav-link" href="products.html">Products</a>
          <a class="nav-link" href="contact.html">Contact</a>
          <a class="nav-link" href="author.html">Author</a>
        </div>
      </div>
    </div>
  </nav>
`;
document.getElementById("footer").innerHTML = `
  <footer class="container-fluid cs-bg-black">
    <div class="w-90 mx-auto py-5">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-6 col-lg-3 mb-3 justify-content-center">
          <h3 class="text-capitalize text-white">Quick links</h3>
          <div class="list-group">
            <a href="index.html" class="list-group-item list-group-item-action text-capitalize">
              <i class="fa-solid fa-arrow-right"></i> Home
            </a>
            <a href="products.html" class="list-group-item list-group-item-action text-capitalize">
              <i class="fa-solid fa-arrow-right"></i> Products
            </a>
            <a href="contact.html" class="list-group-item list-group-item-action text-capitalize">
              <i class="fa-solid fa-arrow-right"></i> Contact
            </a>
            <a href="author.html" class="list-group-item list-group-item-action text-capitalize">
              <i class="fa-solid fa-arrow-right"></i> Author
            </a>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3 mb-3 justify-content-center">
          <h3 class="text-capitalize text-white">Socials</h3>
          <div class="list-group">
            <a href="https://www.instagram.com/knskr_/" target="_blank" class="list-group-item list-group-item-action text-capitalize">
              <i class="fa-brands fa-instagram"></i> Instagram
            </a>
            <a href="https://www.linkedin.com/in/%D1%84%D0%B8%D0%BB%D0%B8%D0%BF-%D0%BA%D0%BE%D0%BD%D0%B5%D1%81%D0%BA%D0%B8-8314b42b7/" target="_blank" class="list-group-item list-group-item-action text-capitalize">
              <i class="fa-brands fa-linkedin-in"></i> LinkedIn
            </a>
            <a href="https://github.com/knskr" target="_blank" class="list-group-item list-group-item-action text-capitalize">
              <i class="fa-brands fa-github"></i> Github
            </a>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3 mb-3 justify-content-center">
          <h3 class="text-capitalize text-white">Get in touch</h3>
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action">
                Zdravka Čelara 16, Belgrade, Serbia
            </a>
            <a href="#" class="list-group-item list-group-item-action">
              filipkoneski.gimkm&#64;gmail&#46;com
            </a>
            <a href="#" class="list-group-item list-group-item-action text-capitalize">
              +381 64 123 45 67
            </a>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3 justify-content-center">
          <h3 class="text-capitalize text-white">Repos/docs</h3>
          <div class="mc-social d-flex">
            <div class="cs-icon cs-icon-gold">
              <a href="https://github.com/knskr/PCHarbour.github.io" target="_blank" class="text-white"><i class="fa-brands fa-github"></i></a>
            </div>
            <div class="cs-icon cs-icon-gold mx-1">
              <a href="assets/css/responsive.css" target="_blank" class="text-white"><i class="fa-brands fa-css3-alt"></i></a>
            </div>
            <div class="cs-icon cs-icon-gold me-1">
              <a href="rss.xml" target="_blank" class="text-white"><i class="fa-solid fa-rss"></i></a>
            </div>
            <div class="cs-icon cs-icon-gold">
              <a href="sitemap.xml" target="_blank" class="text-white"><i class="fa-solid fa-sitemap"></i></a>
            </div>
            <div class="cs-icon cs-icon-gold mx-1">
              <a href="dokumentacija.pdf" target="_blank" class="text-white"><i class="fa-solid fa-file"></i></a>
            </div>
          </div>      
        </div>
      </div>
    </div>
    <div class="cs-line"></div>
    <div class="w-90 mx-auto">
      <div class="row py-2">
        <div class="col-12 text-center text-white">
          <p>&copy; All Rights Reserved. Designed by Filip Koneski, 2025. </p>
        </div>
      </div>
    </div>
  </footer>
`;
