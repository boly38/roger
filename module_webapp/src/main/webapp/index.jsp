<!doctype html>
<!--[if lt IE 9]>      <html class="no-js"> <![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en" ng-app="rogerApp">
    <!--<![endif]-->
    <head>
        <meta charset="utf-8"/>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Roger d&eacute;m&eacute;nage</title>
        <link rel="shortcut icon" href="../img/camionjaune.ico"/>
        <meta name="author" content="boly38"/>
        <meta name="description" content="Roger est un jeu"/>

        <style id="antiCJ">
body {
    display: none !important;
}
        </style>
        
        <!-- jQuery CDN : https://code.jquery.com/ -->
        <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
        
        <!-- bootstrap CDN : http://getbootstrap.com/getting-started/ -->
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        
        <!-- Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css">
        
        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

        <!-- angularJS CDN -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular-route.js"></script>

        <!-- angularJS storage CDN -->
	    <script type="text/javascript" src="https://cdn.rawgit.com/auth0/angular-storage/master/dist/angular-storage.js"></script>
     
 	    <!-- Angular Analytics -->
	    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-google-analytics/1.1.5/angular-google-analytics.js"></script>


        <!-- VPU resources -->
        <link rel="stylesheet" href="../css/style.css" />
        <script src="js/app.js"></script>
        <script src="js/controllers.js"></script>
        <script src="js/directives.js"></script>
        <script src="js/services.js"></script>

    </head>
    <body>

       <ng-view></ng-view>

        <div id="myloading" class="loader-mask alert alert-info" role="alert" data-loading>
            <div class="loader-mask-text">Load in progress...</div>
        </div>

        <script type="text/javascript">
    if (self === top) {
      var antiCJ = document.getElementById("antiCJ");
      antiCJ.parentNode.removeChild(antiCJ);
    } else {
      top.location = self.location;
    }
        </script>
    </body>
</html>
