@extends('html')


@section('html')
	
	<section class="section">
		<img class="img-res" src="/imgs/index/1.png" alt="">
		<div class="overlay">
			<div class="absolute" style="top: 32%; left: 60%; right: 7%;">
				<div class="clearfix py1em px2em">
					<img class="mb1em" src="/imgs/logo.png" alt="">
					<p class="font1d1em" style="color: #3e3a39;">“速览家”是2015年基于虚拟现实技术，运用国际先进的UE4图形处理引擎，开发的一款家居行业的VR设计系统，是公司的核心产品，提供VR设计，VR体验，VR采购于一体的装修整装解决方案，旨在提高家居行业用户消费真实体验感，提高生产服务效率及降低各项成本，为行业做点微薄贡献。</p>
				</div>
			</div>
		</div>
	</section>

	<section class="section py2em">
		<div class="container">
			<h4 class="title">提供功能</h4>
			@php
				$rows=[
					[
						'/imgs/index/2.png',
						'VR智能设计',
						'一键智能设计，一键方案报价，真VR身临其境体验',
					],
					[
						'/imgs/index/3.png',
						'主材、家具供应链',
						'高性价比主材、家具套餐内嵌软件、场景化展示销售',
					],
					[
						'/imgs/index/4.png',
						'VR智能设计',
						'对接工厂生产、发货、物流、配送，全流程透明可视化',
					],
				];
			@endphp
			<ul class="clearfix float-ul float-ul-3 index-ul">
				@foreach($rows as $row)
					<li>
						<div>
							<img class="img-res" src="{{ $row[0] }}" alt="">
							<h4>{{ $row[1] }}</h4>
							<p>{{ $row[2] }}</p>
						</div>
					</li>
				@endforeach
			</ul>
				
		</div>
	</section>

	<section class="section py6em mbg-gray">
		<div class="container">
			<div class="row">
				<div class="col-sm-6">
					<img class="img-res" src="/imgs/index/5.png" alt="">
				</div>
				<div class="col-sm-offset-1 col-sm-5">
					<h4 class="font2em">速览家视频</h4>
					<p>视频介绍文案</p>
					<div class="mt6em">
						<a class="bd-solid bd1px mbd-red mc-red py10px px2em" href="">
							了解详情
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section">
		<div class="overlay bg-black50" style="z-index: 999;">
			<div class="container">
				<h4 class="title mt1em" style="color: #ffffff;">所见即所得</h4>
				<p class="subtitle" style="color: #ffffff;">取代传统效果图，全程可视化编辑实时渲染，全程漫游于体验设计方案</p>
				<div class="clearfix mt10em center">
					<a class="btn py10px px2em btn-default" href="javascript:;">全景漫游</a>
				</div>
			</div>
		</div>
		{{-- <img class="img-res" src="/imgs/index/b1.png" alt=""> --}}
		<div class="clearfix" style="height: 530px;">
			<iframe src="http://housebox.cn/Static/qj/qj.html" style="position:absolute;z-index:1" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" width="100%" height="100%" frameborder="no"></iframe>
		</div>
	</section>

	<section class="section py2em">
		<div class="container">
			<h4 class="title">模型即商品</h4>
			<p class="subtitle">场景中的模型1:1还原，对应真实可售商品</p>
			<img class="img-res block-center" style="margin-top: -20px; max-width: 800px;" src="/imgs/index/7.png" alt="">
		</div>
	</section>
	
	<section class="section py2em mbg-gray">
		<div class="container">
			<h4 class="title">高性价比主材、家具供应链</h4>
			<div class="block-center mt3em mb4em" style="max-width: 950px;">
				<div class="row pt1em">
					@php
						$rows=[
							[
								'主材套餐',
								'一线大牌，比天猫低35%，比区域代理低45%',
								'/imgs/index/8.png',
							],
							[
								'家具套餐',
								'覆盖主流家装风格，比区域代理低30%，比线下卖场低50%',
								'/imgs/index/9.png',
							],
						];
					@endphp

					@foreach($rows as $row)
						<div class="col-sm-6 center px3em">
							<h4 class="m0">{{ $row[0] }}</h4>
							<p class="m0 py20px">{{ $row[1] }}</p>
							<img class="img-res" src="{{ $row[2] }}" alt="">
						</div>
					@endforeach
				</div>
			</div>
		</div>
	</section>

	<section class="section py2em">
		<div class="container">
			<h4 class="title">数据案例</h4>
			<div class="row mt4em mb6em c-white center">
				@php
					$rows=[
						[
							'/imgs/index/10.png',
							'速览家',
							'使用数据',
							'已有超100位城市合伙人加盟 <br> 已有数千家装企、门店使用',
						],
						[
							'/imgs/index/11.png',
							'家装行业效果',
							'数据分析',
							'到店率提升至90% <br> 签单率提升至50% <br> 毛利率提升138%',
						],
						[
							'/imgs/index/12.png',
							'家装行业效果',
							'数据分析',
							'到店率提升至90% <br> 签单率提升至50% <br> 毛利率提升138%',
						],
					];	
				@endphp

				@foreach($rows as $row)
					<div class="col-sm-4">
						<div class="clearfix relative">
							<img class="img-res" src="{{ $row[0] }}" alt="">
							<div class="overlay py1em">
								<h4>{{ $row[1] }}</h4>
								<p class="mc-bule font12px">{{ $row[2] }}</p>
								<div class="mt20px">
									{!! $row[3] !!}
								</div>
							</div>
						</div>
					</div>
				@endforeach
			</div>
		</div>
	</section>

	<section class="section mbg-gray py2em">
		<div class="container">
			<h4 class="title">优果科技产品</h4>
			<div class="row mt4em mb3em center">
				@php
					$rows=[
						[
							'/imgs/index/13.png',
							'“速览家” 设计系统',
							'解决企业使用传统设计工具(3dsMax) <br> 出图效率低、成本高、客户体验差 <br> 等问题。实现极速设计，极速签单',
						],
						[
							'/imgs/index/14.png',
							'工地实景',
							'解决企业使用传统设计工具(3dsMax) <br> 出图效率低、成本高、客户体验差 <br> 等问题。实现极速设计，极速签单',
						],
						[
							'/imgs/index/15.png',
							'全景商家',
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

	<section class="section py2em">
		<div class="container">
			<h4 class="title mt1em">为您提供</h4>
			<p class="subtitle">一站式解决方案</p>

			<div class="clearfix mt4em mb3em">
				@php
					$rows=[
						[
							'/imgs/index/16.png',
							'极速设计',
							'在线使用设计工具',
						],
						[
							'/imgs/index/17.png',
							'线上选材',
							'商品模型供设计搭配',
						],
						[
							'/imgs/index/18.png',
							'VR体验营销',
							'VR体验人在未来家',
						],
						[
							'/imgs/index/19.png',
							'装修清单',
							'方案转化装修清单',
						],
						[
							'/imgs/index/20.png',
							'在线下单',
							'支持在线购买商品',
						],
						[
							'/imgs/index/21.png',
							'厂商生产配送',
							'自动对接ERP生产配送',
						],
					];	
				@endphp

				<ul class="clearfix float-ul float-ul-6 index-ul2">
					@foreach($rows as $key => $row)
						<li>
							<div class="box">
								<div>
									<img class="img-res" src="{{ $row[0] }}" alt="">
								</div>
								<h5>{{ $row[1] }}</h5>
								<p>{{ $row[2] }}</p>
							</div>
							<div class="step">
								<span>{{ $key + 1 }}</span>
							</div>
						</li>
					@endforeach
				</ul>
			</div>
		</div>
	</section>
	

@endsection



@push('css2')
	<style type="text/css" media="screen">
		.btn-default{
			background-color: transparent;
			color: #ffffff;
		}
	</style>
@endpush



@push('js2')
	<script type="text/javascript">
	$('.btn-default').click(function(event) {
		$(this).closest('.overlay').remove();
	});

	$(function(){
		
	});
	</script>
@endpush