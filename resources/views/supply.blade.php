@extends('html')


@section('html')
	@include($nav)
	
	<section class="section">
		<img class="img-res" src="/imgs/supply/1.png" alt="">
		<div class="overlay bg-white70">
			<div class="display-table full-width full-height">
				<div class="display-tablecell">
					<div class="center" style="margin-top: -4em;">
						<h1 class="mb1em"><span class="dib py10px px1em c-white" style="background-color: #000;">{{ $TITLE }}</span></h1>
						<h2 class="mb1em" style="color: #2D2A2A;">精选多款套餐，让装企轻松赚钱</h2>
						<h5>拥有多年经验的供应链团队考察全国家具品牌厂商</h5>
						<h5>精心研发出风格多样，性价比超高的套餐产品</h5>
						<h5>让装企业务范围从硬装轻松拓展到主材销售和家具销售</h5>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section mbg-gray py2em">
		<div class="container">
			<h4 class="title">VR场景化销售，高效签单</h4>
			<p class="subtitle">主材套餐内嵌到VR系统中，极速完成方案，一键身临其境体验，销售转化率翻倍</p>
			@php
				$rows=[
					[
						'/imgs/supply/2.png',
						'套餐VR化',
						'主材套餐1:1建模放入VR设计系统中'
					],
					[
						'/imgs/supply/3.png',
						'智能设计',
						'主材套餐1:1建模放入VR设计系统中'
					],
					[
						'/imgs/supply/4.png',
						'一键下单',
						'主材套餐1:1建模放入VR设计系统中'
					],
					[
						'/imgs/supply/5.png',
						'云订单管理',
						'主材套餐1:1建模放入VR设计系统中'
					],
				];
			@endphp
			
			<div class="row mt2em mb4em">
				@foreach($rows as $row)
					<div class="col-sm-3">
						<div class="clearfix center p1em">
							<div class="clearfix">
								<img class="img-res" src="{{ $row[0] }}" alt="">
							</div>
							<div class="clearfix p10px font1d2em c-white" style="background-color: #000000;">
								{{ $row[1] }}
							</div>
							<div class="clearfix p10px font12px bg-white" style="color: #929bA0;">
								{{ $row[2] }}
							</div>
						</div>
					</div>
				@endforeach
			</div>
		</div>
	</section>

	<section class="section py2em">
		<div class="container">
			<h4 class="title">比天猫店低35%，比线下门店低45%</h4>
			<p class="subtitle">一线主材大牌，品质有保障</p>
	
			<img class="img-res mt2em" src="/imgs/supply/6.png" alt="">
		</div>
	</section>

	<section class="section mbg-gray py2em">
		<div class="container">
			<h4 class="title">主材套餐</h4>
			<p class="subtitle">主材套餐内置到VR系统中，极速完成方案，一键身临其境体验，销售转化率翻倍</p>
			<div class="row mt4em mb3em center">
				@php
					$rows=[
						[
							'/imgs/supply/7.png',
							'主材套餐A',
							'解决企业使用传统设计工具(3dsMax) <br> 出图效率低、成本高、客户体验差 <br> 等问题。实现极速设计，极速签单',
						],
						[
							'/imgs/supply/8.png',
							'主材套餐B',
							'解决企业使用传统设计工具(3dsMax) <br> 出图效率低、成本高、客户体验差 <br> 等问题。实现极速设计，极速签单',
						],
						[
							'/imgs/supply/9.png',
							'主材套餐C',
							'解决企业使用传统设计工具(3dsMax) <br> 出图效率低、成本高、客户体验差 <br> 等问题。实现极速设计，极速签单',
						],
					];	
				@endphp

				@foreach($rows as $row)
					<div class="col-sm-4">
						<div class="clearfix mx1em">
							<div class="relative c-white">
								<img class="img-res" src="{{ $row[0] }}" alt="">
								<div class="overlay pt3em">
									<h4>{{ $row[1] }}</h4>
								</div>
							</div>
							<div class="p20px font12px bg-white" style="color: #929ba0;">
								{!! $row[2] !!}
							</div>
							<div class="p15px bg-white" style="background-color: #fafafa;">
								<a class="mc-red" href=""><h4 class="m0">查看详情</h4></a>
							</div>
						</div>
					</div>
				@endforeach
			</div>
		</div>
	</section>

@endsection



@push('css2')
	<style type="text/css" media="screen">
		h5{
			font-weight: 200;
		}
	</style>
@endpush



@push('js2')
	<script type="text/javascript">
	$(function(){
		
	});
	</script>
@endpush