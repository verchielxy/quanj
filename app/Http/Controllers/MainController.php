<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MainController extends Controller
{
    public function __construct()
    {
        
    }

    // 速览家
    public function index(Request $request)
    {
        return view('index',[
            'TITLE'=>'速览家',
            'PAGE_CODE'=>route('index'),
            'META_KEYWORDS'=>'',
            'META_DESC'=>'',
        ]);
    }	

    public function video(Request $request)
    {
        return view('video',[
            'TITLE'=>'视频教程',
            'PAGE_CODE'=>route('video'),
            'META_KEYWORDS'=>'',
            'META_DESC'=>'',
        ]);
    }

    public function design(Request $request)
    {
        return view('design',[
            'TITLE'=>'优秀设计',
            'PAGE_CODE'=>route('design'),
            'META_KEYWORDS'=>'',
            'META_DESC'=>'',
        ]);
    }

    public function download(Request $request)
    {
        return view('download',[
            'TITLE'=>'软件下载',
            'PAGE_CODE'=>route('download'),
            'META_KEYWORDS'=>'',
            'META_DESC'=>'',
        ]);
    }

    public function production(Request $request)
    {
        return view('production',[
            'TITLE'=>'产品中心',
            'PAGE_CODE'=>route('production'),
            'META_KEYWORDS'=>'',
            'META_DESC'=>'',
        ]);
    }

    protected static function supplyrows()
    {
        return [
            [
                '套餐A',
                route('item',['num'=>1]),
            ],
            [
                '套餐B',
                route('item',['num'=>2]),
            ],
            [
                '主材套餐A',
                route('item',['num'=>3]),
            ],
            [
                '主材套餐B',
                route('item',['num'=>4]),
            ],
            [
                '家具套餐A',
                route('item',['num'=>5]),
            ],
            [
                '家具套餐B',
                route('item',['num'=>6]),
            ],
        ];
    }

    public function supply(Request $request)
    {
        return view('supply',[
            'TITLE'=>'主材供应链',
            'PAGE_CODE'=>route('supply'),
            'META_KEYWORDS'=>'',
            'META_DESC'=>'',
            'nav'=>'supply_nav',
            'supplyrows'=>static::supplyrows(),
        ]);
    }

    public function item(Request $request, $num)
    {
        $supplyrows=static::supplyrows();

        return view('supplys.'.$num,[
            'TITLE'=>$supplyrows[$num-1][0],
            'PAGE_CODE'=>route('item',['num'=>$num]),
            'META_KEYWORDS'=>'',
            'META_DESC'=>'',
            'nav'=>'supply_nav',
            'supplyrows'=>$supplyrows,
        ]);
    }

    public function supply2(Request $request)
    {
        return view('supply2',[
            'TITLE'=>'家具供应链',
            'PAGE_CODE'=>route('supply2'),
            'META_KEYWORDS'=>'',
            'META_DESC'=>'',
            'nav'=>'supply_nav',
        ]);
    }

    public function cooperate(Request $request)
    {
        return view('cooperate',[
            'TITLE'=>'工厂合作',
            'PAGE_CODE'=>route('cooperate'),
            'META_KEYWORDS'=>'',
            'META_DESC'=>'',
        ]);
    }

    public function partner(Request $request)
    {
        return view('partner',[
            'TITLE'=>'城市合伙人',
            'PAGE_CODE'=>route('partner'),
            'META_KEYWORDS'=>'',
            'META_DESC'=>'',
        ]);
    }

    public function contactus(Request $request)
    {
        return view('contactus',[
            'TITLE'=>'联系我们',
            'PAGE_CODE'=>route('contactus'),
            'META_KEYWORDS'=>'',
            'META_DESC'=>'',
        ]);
    }
    

}
