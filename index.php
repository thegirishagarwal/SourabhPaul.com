<?php
$headerClass = 'header-transparent';
$bodyClass = 'animation-running';
include 'header.php';?>


	<?php
		$welcomeImageData = [
			'welcome-1.jpg',
			'welcome-2.jpg',
			'welcome-3.jpg',
			'welcome-4.jpg'
		];

		$welcomeImageKeys = shuffle($welcomeImageData);
		$welcomeImage = $welcomeImageData[$welcomeImageKeys];
	?>

	<section id="welcome" class="section flex-wrap justify-content-center align-items-center">
		<div class="section-overlay welcome-overlay"></div>
		<div class="container-fluid">
			<div class="row">
				<img src="libraries/images/<?php echo $welcomeImage; ?>" alt="" data-image="#welcome">
				<div class="container">
					<div class="welcome-container text-center">
						<h2 class="welcome-headline">Welcome to</h2>
						<h3 class="welcome-title"><span>S</span>ourabhPaul.com</h3>
					</div>
				</div>
			</div>
		</div>
	</section>

	<div id="main">
		<section id="hero" class="section d-flex flex-wrap align-items-center">
			<div class="section-overlay hero-overlay"></div>
			<img src="libraries/images/hero-banner.png" alt="Hero Banner" data-image="#hero">
				<div class="container h-100">
					<div class="hero-container no-gutters h-100 d-flex flex-wrap w-100">
						<div class="col-sm-6">
							<div class="hero-left hero-items h-100 d-flex flex-wrap justify-content-center align-items-center">
								<h3>
									Motion
								</h3>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="hero-right hero-items h-100 d-flex flex-wrap justify-content-center align-items-center">
								<h3>
									Photography
								</h3>
							</div>
						</div>
					</div>
				</div>
			<div class="goToBottom">
				<a href="javascript:;">
					<img src="libraries/images/arrow-bottom.png" alt="Arrow Bottom">
				</a>
			</div>
		</section>

		<section id="aboutme" class="section d-flex flex-wrap align-items-center">
			<div class="container-fluid w-100">
				<div class="row">
					<div class="container">
						<div class="aboutme-container">
							<div class="about-body">
								<div class="d-flex flex-wrap align-items-end">
									<div class="col-md-5">
										<div class="about-image text-center">
											<figure>
												<img src="libraries/images/about-me.png" alt="About Me" class="img-fluid">
											</figure>
										</div>
									</div>
									<div class="col-md-7">
										<h2 class="section-title">
											<span>About me</span>
										</h2>
										<div class="about-description">
											<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section id="clients" class="section d-flex flex-wrap align-items-center">
			<div class="section-overlay client-overlay"></div>
			<div class="container-fluid">
				<div class="row">
					<img src="libraries/images/client-banner.jpg" alt="Client Banner" data-image="#clients">
					<div class="container">
						<div class="clients-container">
							<div class="client-header text-center">
								<h2 class="section-title">
									<span>Clients</span>
								</h2>
							</div>
							<div class="client-body">
								<div class="clients-logo-section">
									<div class="client-logo-slider owl-carousel">
										<div class="slider-item">
											<div class="d-flex flex-wrap justify-content-between align-items-center">
												<div class="client-logo">
													<div class="client-logo-image">
														<div class="inner-logo-image">
															<figure class="d-flex flex-wrap align-items-center justify-content-center">
																<img src="libraries/images/ngp.jpg" alt="Client Logo">
															</figure>
														</div>
													</div>
												</div>
												<div class="client-logo">
													<div class="client-logo-image">
														<div class="inner-logo-image">
															<figure class="d-flex flex-wrap align-items-center justify-content-center">
																<img src="libraries/images/rsvp.png" alt="Client Logo">
															</figure>
														</div>
													</div>
												</div>
												<div class="client-logo">
													<div class="client-logo-image">
														<div class="inner-logo-image">
															<figure class="d-flex flex-wrap align-items-center justify-content-center">
																<img src="libraries/images/mx-player.png" alt="Client Logo">
															</figure>
														</div>
													</div>
												</div>
												<div class="client-logo">
													<div class="client-logo-image">
														<div class="inner-logo-image">
															<figure class="d-flex flex-wrap align-items-center justify-content-center">
																<img src="libraries/images/excel-entartainment.png" alt="Client Logo">
															</figure>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section id="contact" class="section d-flex flex-wrap align-items-center">
			<div class="container-fluid">
				<div class="row">
					<div class="container">
						<div class="contact-container">
							<div class="contact-information text-center">
								<p>Like what i do? Get in Touch</p>
								<p>
									<span>
										<a href="mailto:sourabhpoul@gmail.com">sourabhpoul@gmail.com</a>
										<span class="d-none d-md-inline">|</span>
										<a href="tel:987456123">987456123</a>
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="footer">
				<div class="container-fluid">
					<div class="row">
						<div class="container">
							<div class="footer-navigation">
								<ul class="list-unstyled">
									<li>
										<a href="motion.php">
											Motion
										</a>
									</li>
									<li>
										<a href="javascript:;">
											Photography
										</a>
									</li>
									<li>
										<a href="#aboutmePage" class="scroll" data-href="#aboutme">
											About
										</a>
									</li>
									<li>
										<a href="#clientsPage" class="scroll" data-href="#clients">
											Clients
										</a>
									</li>
									<li>
										<a href="javascript:;">
											Blog
										</a>
									</li>
									<li>
										<a href="#contactPage" class="scroll" data-href="#contact">
											Contact
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>

<?php include 'footer.php';?>