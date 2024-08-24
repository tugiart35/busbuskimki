<?php get_header(); ?>
<body <?php body_class('is-preload'); ?>>

    <!-- Header -->
    <div id="header">
        <div class="top">
            <!-- Logo -->
            <div id="logo">
                <span class="image avatar48"><img src="<?php echo get_template_directory_uri(); ?>/images/pp.jpg" alt="busbuskimki" /></span>
                <h1 id="title"><?php bloginfo('name'); ?></h1>
                <p>Numerolog</p>
            </div>

            <!-- Nav -->
            <nav id="nav">
                <ul>
                    <li><a href="#top" id="top-link"><span class="icon solid fa-home">Anasayfa</span></a></li>
                    <li><a href="<?php echo home_url('/randevu'); ?>" id="about-link"><span class="icon solid fa-calendar-check-o">Randevu Al</span></a></li>
                    <li><a href="#hizmetlermainpage" id="portfolio-link"><span class="icon solid fa-th">Hizmetler</span></a></li>
                    <li><a href="#about" id="about-link"><span class="icon solid fa-heart">Hakkımda</span></a></li>
                    <li><a href="<?php echo home_url('/calculate'); ?>" id="about-link"><span class="fas fa-calculator"></span> Hesaplamalar</span></a></li>
                </ul>
            </nav>
        </div>

        <div class="bottom">
            <!-- Social Icons -->
            <ul class="icons">
                <li><a href="https://www.instagram.com/busbuskimki/" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
                <li><a href="https://www.instagram.com/busbuskimki/" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
                <li><a href="mailto:busbuskimki@gmail.com" class="icon solid fa-envelope"><span class="label">Email</span></a></li>
            </ul>
        </div>
    </div>

    <!-- Main -->
    <div id="main">
        <!-- Intro Section -->
        <section id="top" class="one dark cover"> 
            <div class="container">
                <div class="row gx-12 gx-lg-12 align-items-center my-5">
                    <div class="col-lg-12"><img class="img-fluid rounded mb-4 mb-lg-0" src="<?php echo get_template_directory_uri(); ?>/images/busbuskimki-numerolgy.png" alt="..." /></div>
                    <div class="col-12">               
                        <header>
                            <h1 class="font-weight-light" style="color: #fab47f; font-weight: bold; font-size: 64px; font-family: 'Gupter';">"Who am I?"</h1>
                            <p class="whoAmI">Bu mucizevi soru ile başladı yolculuğum.</p>
                            <hr>
                            <p class="website-1-hex">Kendimi ararken, benden içeri koca bir diyarda kayboldum...</p>
                        </header>
                        <footer>
                            <a href="<?php echo home_url('/randevual'); ?>" class="btn btn-warning">Randevu Al</a>
                        </footer>
                    </div>
                </div>
            </div>
        </section>

        <!-- Diğer bölümler -->
        <!-- Portfolio Section, Counter Section, About Section burada devam edecek -->
    </div>

    <!-- Footer -->
    <div id="footer"></div>

    <?php get_footer(); ?>