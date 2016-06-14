var mod = angular.module('directives', []);

mod.directive('navbar', function(){
	return{
		template: `
		<nav class="navbar navbar-default">
		  <div class="container">
		    <!-- Brand and toggle get grouped for better mobile display -->
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
		        <span class="sr-only">Toggle navigation</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		      <a class="navbar-brand" href="#/">15 Minutes</a>
		    </div>

		    <!-- Collect the nav links, forms, and other content for toggling -->
		    <div ng-if="$root.loggedIn == true" class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      <ul class="nav navbar-nav navbar-right">
		        <li><a href="#/">Home</a></li>
		        <li><a ng-click="logout()">logout</a></li>
		      </ul>
		    </div><!-- /.navbar-collapse -->

		  </div><!-- /.container -->
		</nav>
		`
	}
});

mod.directive('footerBar', function(){
	return{
		template: `
		<div class="container">
			<footer class="footer">
				<p class="footer-text">15 Minutes &copy; 2016</p>
			</footer>
		</div>
		`
	}
});