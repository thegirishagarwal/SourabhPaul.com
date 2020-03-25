<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="application-name" content="SourabhPaul">
	<title>SourabhPaul.com</title>

	<!--
		======================================
			Custom css include
		======================================
	 -->
	 	<!-- Font -->
	 		<link href="https://fonts.googleapis.com/css?family=Comfortaa:300,400,500,600,700&display=swap" rel="stylesheet">
	 		<link href="libraries/fonts/stylesheet.css" rel="stylesheet">

	 	<!-- Plugins -->
			<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css">
			<link rel="stylesheet" href="libraries/plugins/owlCarousel/assets/owl.carousel.min.css">
			<link rel="stylesheet" href="libraries/plugins/magnific/magnific-popup.css">

			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.0.8/fullpage.min.css" />
		<!-- Custom -->
			<link rel="stylesheet" type="text/css" href="libraries/css/style.css?v=<?php echo time(); ?>">
			<link rel="stylesheet" type="text/css" href="libraries/css/media.css?v=<?php echo time(); ?>">
	<!--
		======================================
			Custom css include
		======================================
	 -->
</head>
	<body class="<?php echo ($bodyClass) ? $bodyClass : '' ?>">

		<!-- Header Conent -->

			<header id="header" class="site-header <?php echo ($headerClass) ? $headerClass : ''; ?>">
				<div class="container-fluid">
					<div class="row">
						<div class="container">
							<div class="header-container">
								<div class="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-center">
									<div class="logo-wraper">
										<h1>
											<a href="index.php">
												<span>S</span>ourabhPaul.com
											</a>
										</h1>
									</div>

									<div id="mobile-menu" class="d-flex d-lg-none">
										<a href="javascript:;">
											<span></span>
										</a>
									</div>
									<div class="menu-navbar d-flex flex-wrap justify-content-between align-items-start align-items-lg-center">
										<div id="close-menu" class="d-lg-none">
											<a href="javascript:;">
												<span></span>
											</a>
										</div>
										<nav id="navigation" class="d-flex flex-wrap justify-content-between w-100">
											<div class="col-lg-4">
												<ul id="menu-left" class="d-flex flex-wrap list-unstyled">
													<li>
														<a href="motion.php">
															Motion
														</a>
													</li>
													<li>
														<a href="photography.php">
															Photography
														</a>
													</li>
													<li>
														<a href="#aboutmePage" class="scroll" data-href="#aboutme">
															About
														</a>
													</li>
												</ul>
											</div>
											<div class="col-lg-4">
												<ul id="menu-right" class="d-flex flex-wrap list-unstyled">
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
										</nav>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header><!-- /header -->


