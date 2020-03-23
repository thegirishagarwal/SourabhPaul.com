<?php
$headerClass = '';
$bodyClass = '';
include 'header.php' ?>

<?php

    $film_stills = [
        'film-stills-1.jpeg',
        'film-stills-2.jpg',
        'film-stills-3.jpg',
        'film-stills-4.jpg',
        'film-stills-5.jpg',
        'film-stills-6.jpg',
        'film-stills-7.jpg',
        'film-stills-8.jpg',
        'film-stills-9.jpg',
        'film-stills-10.jpg',
        'film-stills-11.jpg',
        'film-stills-12.jpg',
        'film-stills-13.jpg',
        'film-stills-14.jpg',
        'film-stills-15.jpg',
        'film-stills-16.jpg',
        'film-stills-17.jpg',
        'film-stills-18.jpg',
        'film-stills-19.jpg',
        'film-stills-20.jpg',
        'film-stills-21.jpg',
        'film-stills-22.jpg',
        'film-stills-23.jpg',
        'film-stills-24.jpg',
        'film-stills-25.jpg',
        'film-stills-26.jpg',
        'film-stills-27.jpg',
        'film-stills-28.jpg',
        'film-stills-29.jpg',
        'film-stills-30.jpg',
        'film-stills-31.jpg',
        'film-stills-32.jpg',
        'film-stills-33.jpg',
        'film-stills-34.jpg',
        'film-stills-35.jpg',
        'film-stills-36.jpg',
        'film-stills-37.jpg',
        'film-stills-38.jpg',
        'film-stills-39.jpg',
        'film-stills-40.jpg',
        'film-stills-41.jpg',
        'film-stills-42.jpg',
        'film-stills-43.jpg'
    ];

?>

    <section id="photography">
        <div class="container-fluid">
            <div class="row">
                <div class="container">
                    <div class="photography-container">
                        <div class="inner-photography d-flex flex-wrap row">
                            <div class="col-xl-3 col-lg-2">
                                <ul class="nav flex-lg-column flex-row justify-content-between justify-content-lg-start nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="film-stills-tab" data-toggle="pill" href="#film-stills" role="tab" aria-controls="film-stills" aria-selected="true">Film Stills</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="onset-tab" data-toggle="pill" href="#onset" role="tab" aria-controls="onset" aria-selected="false">Onset</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="portraits-tab" data-toggle="pill" href="#portraits" role="tab" aria-controls="portraits" aria-selected="false">Portraits</a>
                                    </li>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="fashion-tab" data-toggle="pill" href="#fashion" role="tab" aria-controls="fashion" aria-selected="false">Fashion</a>
                                    </li>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="personal-tab" data-toggle="pill" href="#personal" role="tab" aria-controls="personal" aria-selected="false">Personal</a>
                                    </li>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="mobile-tab" data-toggle="pill" href="#mobile" role="tab" aria-controls="mobile" aria-selected="false">Mobile</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-xl-9 col-lg-10">
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade show active" id="film-stills" role="tabpanel" aria-labelledby="film-stills">
                                        <div class="photography-content">
                                            <div class="photo-sizer"></div>
                                            <?php 
                                                foreach ($film_stills as $value) {
                                            ?>
                                                <div class="photography-item">
                                                    <img src="libraries/images/<?php echo $value; ?>" alt="" class="img-fluid">
                                                </div>
                                            <?php
                                                }
                                            ?>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="onset" role="tabpanel" aria-labelledby="onset">Onset</div>
                                    <div class="tab-pane fade" id="portraits" role="tabpanel" aria-labelledby="portraits">Portraits</div>
                                    <div class="tab-pane fade" id="fashion" role="tabpanel" aria-labelledby="fashion">Fashion</div>
                                    <div class="tab-pane fade" id="personal" role="tabpanel" aria-labelledby="personal">Personal</div>
                                    <div class="tab-pane fade" id="mobile" role="tabpanel" aria-labelledby="mobile">Mobile</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

<?php include 'footer.php' ?>