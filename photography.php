<?php
$headerClass = '';
include 'header.php' ?>

    <section id="photography">
        <div class="container-fluid">
            <div class="row">
                <div class="container">
                    <div class="photography-container">
                        <div class="inner-photography d-flex flex-wrap row">
                            <div class="col-md-3">
                                <ul class="nav flex-column nav-pills mb-3" id="pills-tab" role="tablist">
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
                            <div class="col-md-9">
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade show active" id="film-stills" role="tabpanel" aria-labelledby="film-stills">
                                        <div class="photography-content">
                                            <div class="photo-sizer"></div>
                                            <div class="photography-item">
                                                <img src="libraries/images/photo1.jpg" alt="" class="img-fluid">
                                            </div>
                                            <div class="photography-item">
                                                <img src="libraries/images/photo2.jpg" alt="" class="img-fluid">
                                            </div>
                                            <div class="photography-item">
                                                <img src="libraries/images/photo3.jpg" alt="" class="img-fluid">
                                            </div>
                                            <div class="photography-item">
                                                <img src="libraries/images/photo4.jpg" alt="" class="img-fluid">
                                            </div>
                                            <div class="photography-item">
                                                <img src="libraries/images/photo5.jpg" alt="" class="img-fluid">
                                            </div>
                                            <div class="photography-item">
                                                <img src="libraries/images/photo6.jpg" alt="" class="img-fluid">
                                            </div>
                                            <div class="photography-item">
                                                <img src="libraries/images/photo7.jpg" alt="" class="img-fluid">
                                            </div>
                                            <div class="photography-item">
                                                <img src="libraries/images/photo8.jpg" alt="" class="img-fluid">
                                            </div>
                                            <div class="photography-item">
                                                <img src="libraries/images/photo9.jpg" alt="" class="img-fluid">
                                            </div>
                                            <div class="photography-item">
                                                <img src="libraries/images/photo10.jpg" alt="" class="img-fluid">
                                            </div>
                                            <div class="photography-item">
                                                <img src="libraries/images/photo11.jpg" alt="" class="img-fluid">
                                            </div>
                                            <div class="photography-item">
                                                <img src="libraries/images/photo12.jpg" alt="" class="img-fluid">
                                            </div>
                                            <div class="photography-item">
                                                <img src="libraries/images/photo13.jpg" alt="" class="img-fluid">
                                            </div>
                                            <div class="photography-item">
                                                <img src="libraries/images/photo14.jpg" alt="" class="img-fluid">
                                            </div>
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