<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="Content-Language" content="zh-CN">
        <meta name="author" content="">
        <meta name="robots" content="index,follow,archive">
        <title>{{$TITLE or ''}}</title>
        <meta name="keywords" content="{{ $META_KEYWORDS or '' }}">
        <meta name="description" content="{{ $META_DESC or '' }}">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        
        <link type='text/css' href='/assets/font-awesome-4.7.0/css/font-awesome.min.css' rel='stylesheet'>
        <link type='text/css' href='/assets/unit/unit.min.css' rel='stylesheet'>
        <link type='text/css' href='/css/app.css' rel='stylesheet'>

        <style type="text/css" media="screen">
        </style>

        @stack('css')
        @stack('css2')
        @stack('css3')
        
        <link rel="icon" href="/favicon.png" type="image/x-icon">
        <link rel="shortcut icon" href="/favicon.png">
    </head>

    <body>

        <div class="container-fluid">
            @include('header')
        	
            @section('body')
        	   @yield('html')
            @show

            @include('footer')
        </div>

        <script type='text/javascript' src='/assets/jquery/jquery-3.1.1.min.js'></script>
        <script type='text/javascript' src='/assets/jquery/jquery-easing-1.3.min.js'></script>
        <script type='text/javascript' src='/assets/jquery/jquery-transit-0.9.12.min.js'></script>
        <script type='text/javascript' src='/assets/unit/unit.min.js'></script>
        <script type='text/javascript' src='/js/app.js'></script>

        <!-- custom css -->
        <script type="text/javascript">
        </script>

        @stack('js')
        @stack('js2')
        @stack('js3')
    </body>
</html>
