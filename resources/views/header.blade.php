@php
    $rows=[
        '首页'=>route('index'),
        '视频教程'=>route('video'),
        '优秀设计'=>route('design'),
        '软件下载'=>route('download'),
        '产品中心'=>[
            '速览家'=>route('production'),
        ],
        '供应链'=>[
            '主材供应链'=>route('supply'),
            '家具供应链'=>route('supply2'),
        ],
        '工厂合作'=>route('cooperate'),
        '城市合伙人'=>route('partner'),
        '联系我们'=>route('contactus'),
    ];    
@endphp

<nav class="navbar navbar-my m0">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#my-navbar-collapse" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">
                <img src="/imgs/logo.png" alt="">
            </a>
        </div>

        <div class="collapse navbar-collapse" id="my-navbar-collapse">
            <div class="clearfix">
                <div class="col-sm-offset-1 col-sm-8 px0">
                    <ul class="nav navbar-nav">
                        @foreach($rows as $title => $url)
                            @if(is_array($url))
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        {{ $title }} <span class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu">
                                        @foreach($url as $title2 => $url2)
                                            <li class="{{ $PAGE_CODE==$url2?'active':'' }}"><a href="{{ $url2 }}">{{ $title2 }}</a></li>
                                        @endforeach
                                    </ul>
                                </li>
                            @else
                                <li class="{{ $PAGE_CODE==$url?'active':'' }}">
                                    <a href="{{ $url }}">{{ $title }}</a>
                                </li>
                            @endif
                        @endforeach
                    </ul>
                </div>
            </div>  
        </div>
    </div>
</nav>